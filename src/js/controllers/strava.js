angular.module('finalProject')
  .controller('StravaIndexController', StravaIndexController);

StravaIndexController.$inject = ['$http', 'StravaService','$auth', 'User','UserPlan', '$window'];
function StravaIndexController($http, StravaService, $auth, User, UserPlan, $window){
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
  const accessToken = 'b4a334d702082f818e68b3dc918cc7491a3e780c';

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

  function viewDay(stravaActivityId) {
    console.log('clicked');
    console.log(stravaActivityId);
  }
  stravaIndex.viewDay = viewDay;
}
