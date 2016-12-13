angular.module('finalProject')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
function googleMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '='
    },
    link: function($scope, element) {
      const map = new $window.google.maps.Map(element[0], {
        center: {lat: 51, lng: -1},
        zoom: 12
      });
    }
  };
}
