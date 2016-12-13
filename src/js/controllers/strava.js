angular.module('finalProject')
  .controller('StravaIndexController', StravaIndexController);

StravaIndexController.$inject = ['$http', 'StravaService','$auth', 'User','UserPlan','Day', '$window', '$state'];
function StravaIndexController($http, StravaService, $auth, User, UserPlan, Day, $window, $state){
  const stravaIndex = this;
  const moment = $window.moment;
  const userId = $auth.getPayload().id;

  User.get({id: userId}, (res) => {
    res.user_plans.forEach((plan) => {
      if (plan.active) {
        stravaIndex.userPlanId = plan.id;
        UserPlan.get({id: plan.id }, (data) => {
          stravaIndex.userDays = data.user_days;
          data.user_days.forEach((day) => {
            day.date = moment(day.date).format('YYYY-MM-DD');
          });

        });
      }
    });
  });


  // Get activities from Strava
  const accessToken = $window.localStorage.getItem('strava_token');

  StravaService
    .getActivities(accessToken)
    .then(
      successResponse => {
        stravaIndex.data = successResponse;
      },
      errorResponse => {
        console.log(errorResponse);
      }
    );

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
