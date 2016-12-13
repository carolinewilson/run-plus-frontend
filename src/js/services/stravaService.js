angular.module('finalProject')
  .service('StravaService', StravaService);

StravaService.$inject = ['$http', '$window'];
function StravaService($http, $window) {
  const moment = $window.moment;

  function getActivities(accessToken) {

    return $http({
      method: 'GET',
      url: 'http://localhost:3000/api/strava',
      params: {
        accessToken
      }
    }).then(function successCallback(response) {
      response.data.forEach((activity) => {
        activity.start_date = moment(activity.start_date).format('YYYY-MM-DD');
      });

      return response.data;
    }, function errorCallback(response) {
      console.log(response);
    });
  }

  function getActivity(accessToken, activityId) {

    return $http({
      method: 'GET',
      url: 'http://localhost:3000/api/strava/activity',
      params: {
        activityId,
        accessToken
      }
    }).then(function successCallback(response) {
      response.data.forEach((activity) => {
        activity.start_date = moment(activity.start_date).format('YYYY-MM-DD');
      });

      return response.data;
    }, function errorCallback(response) {
      console.log(response);
    });
  }

  this.getActivities = getActivities;
  this.getActivity = getActivity;
}
