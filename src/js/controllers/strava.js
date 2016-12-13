angular.module('finalProject')
  .controller('StravaIndexController', StravaIndexController);

StravaIndexController.$inject = ['$http', 'StravaService','$auth', 'User'];
function StravaIndexController($http, StravaService, $auth, User){
  const stravaIndex = this;
  const userId = $auth.getPayload().id;
  console.log(userId);
  User.get({id: userId}, (res) => {
    console.log(res);
  });
  
  const accessToken = 'b4a334d702082f818e68b3dc918cc7491a3e780c';

  StravaService
    .getActivities(accessToken)
    .then(
      successResponse => {
        console.log(successResponse);
        stravaIndex.data = successResponse;
      },
      errorResponse => {
        console.log(errorResponse);
      }
    );

}
