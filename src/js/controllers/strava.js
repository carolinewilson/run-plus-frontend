angular.module('finalProject')
  .controller('StravaIndexController', StravaIndexController);

StravaIndexController.$inject = ['$http', 'StravaService','$auth', 'User','UserPlan','Day', '$window', '$state'];
function StravaIndexController($http, StravaService, $auth, User, UserPlan, Day, $window, $state){
  const stravaIndex = this;
  const moment = $window.moment;
  const userId = $auth.getPayload().id;
  stravaIndex.allActivities = [];
  stravaIndex.userDays = [];

  function hasStravaToken () {
    return !!$window.localStorage.getItem('strava_token');
  }

  function getStravaToken() {
    return $window.localStorage.getItem('strava_token');
  }

  function matchUserDays(stravaData) {
    for(let i=0;i<stravaData.length;i++) {
      const userDayIdx = stravaIndex.userDays.findIndex((day) => {
        return moment(day.date).format('YYYY-MM-DD') === stravaData[i].start_date;
      });

      if(userDayIdx > 0) {
        stravaData[i].userDay = stravaIndex.userDays.splice(userDayIdx, 1)[0];
      }
    }

    return stravaData;
  }

  function init() {
    UserPlan.query({ user_id: userId, active: true }).$promise.then((userPlans) => {
      stravaIndex.planId = userPlans[0].id;

      stravaIndex.userDays = userPlans[0].user_days;
      if(hasStravaToken()){
        return StravaService
          .activityIndex(getStravaToken());
      }
    })
    .then((stravaData) => {
      stravaIndex.allActivities = matchUserDays(stravaData || []);

      const completedDays = stravaIndex.userDays.filter((day) => {
        return day.completed;
      });
      // stravaIndex.allActivities.concat(completedDays);
      stravaIndex.allActivities.push(completedDays[0]);


    })
    .catch((err) => {
      console.log(err);
    });
  }

  function markComplete(planId, dayId, stravaId) {
    Day.update({id: planId.dayId}, { strava_id: planId.stravaId, completed: true   }, () => {
      $state.go('daysShow', {planId: planId.planId, dayId: planId.dayId, stravaId: planId.stravaId});
    });
  }

  function sync() {
    if (!hasStravaToken()) {
      $auth.authenticate('strava')
        .then((res) => {
          $window.localStorage.setItem('strava_token', res.data.access_token);
          const stravaId = res.data.athlete.id;
          User.update({id: userId}, {strava_id: stravaId}, () => {
            init();
          });
        });
    } else {
      init();
    }
  }


  init();
  stravaIndex.markComplete = markComplete;
  stravaIndex.sync = sync;
}
