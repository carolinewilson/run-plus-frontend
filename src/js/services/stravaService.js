angular.module('finalProject')
  .service('StravaService', StravaService);

StravaService.$inject = ['$http', '$window'];
function StravaService($http, $window) {
  const moment = $window.moment;

  function activityIndex(accessToken) {

    return $http({
      method: 'GET',
      url: 'http://localhost:3000/api/strava',
      params: {
        accessToken
      }
    }).then(function successCallback(response) {
      response.data.forEach((activity) => {
        activity.start_date = moment(activity.start_date).format('YYYY-MM-DD');

        activity.distance = ((activity.distance / 1000) * 0.621371).toFixed(1);

        activity.elapsed_hours = Math.floor(activity.elapsed_time / 60 /60);
        activity.elapsed_minutes = Math.floor((activity.elapsed_time / 60) % 60);
        activity.elapsed_seconds = ((((activity.elapsed_time % 60) * 60).toString().slice(0,2)) % 60);

      });

      return response.data;
    }, function errorCallback(response) {
      console.log(response);
    });
  }

  function activityShow(accessToken, activityId) {

    return $http({
      method: 'GET',
      url: 'http://localhost:3000/api/strava/activity',
      params: {
        activityId,
        accessToken
      }
    }).then(function successCallback(response) {
      response.data.distance = ((response.data.distance / 1000) * 0.621371).toFixed(1);

      response.data.elapsed_minutes = Math.floor(response.data.elapsed_time / 60);
      response.data.elapsed_seconds = ((response.data.elapsed_time % 60) * 60);


      return response.data;
    }, function errorCallback(response) {
      console.log(response);
    });
  }

  this.activityIndex = activityIndex;
  this.activityShow = activityShow;
}
