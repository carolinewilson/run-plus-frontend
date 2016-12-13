angular.module('finalProject')
  .controller('StravaIndexController', StravaIndexController);

StravaIndexController.$inject = ['$http', 'StravaService','$auth', 'User','UserPlan'];
function StravaIndexController($http, StravaService, $auth, User, UserPlan){
  const stravaIndex = this;
  const userId = $auth.getPayload().id;

  User.get({id: userId}, (res) => {
    res.user_plans.forEach((plan) => {
      if (plan.active) {
        UserPlan.get({id: plan.id }, (data) => {
          stravaIndex.userDays = data.user_days;
          data.user_days.forEach((day) => {
            day.date = moment(day.date).format("YYYY-MM-DD");
          });

          console.log(data.user_days);
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
        // console.log(successResponse);
        stravaIndex.data = successResponse;
      },
      errorResponse => {
        console.log(errorResponse);
      }
    );

}
