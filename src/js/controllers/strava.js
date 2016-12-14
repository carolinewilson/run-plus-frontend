angular.module('finalProject')
  .controller('StravaIndexController', StravaIndexController);

StravaIndexController.$inject = ['$http', 'StravaService','$auth', 'User','UserPlan','Day', '$window', '$state'];
function StravaIndexController($http, StravaService, $auth, User, UserPlan, Day, $window, $state){
  const stravaIndex = this;
  const moment = $window.moment;
  const userId = $auth.getPayload().id;
  stravaIndex.allActivities = [];
  stravaIndex.userDays = [];
  const accessToken = $window.localStorage.getItem('strava_token');

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


  UserPlan.query({ user_id: userId, active: true }).$promise.then((userPlans) => {
    stravaIndex.planId = userPlans[0].id;
    stravaIndex.userDays = userPlans[0].user_days;
    if(accessToken){
      return StravaService
        .activityIndex(accessToken);
    }
  })
  .then((stravaData) => {
    stravaIndex.allActivities = matchUserDays(stravaData || []);

    const completedDays = stravaIndex.userDays.filter((day) => {
      return day.completed;
    });

    stravaIndex.allActivities.concat(completedDays);
  })
  .catch((err) => {
    console.log(err);
  });

  function markComplete(planId, dayId, stravaId){

    Day.get({id: dayId}, (res) => {
      res.completed = true;
      res.strava_id = stravaId;

      Day.update(res, res, () => {
        $state.go('daysShow', {planId: planId, dayId: dayId, stravaId: stravaId});
      });
    });
  }
  stravaIndex.markComplete = markComplete;
}
