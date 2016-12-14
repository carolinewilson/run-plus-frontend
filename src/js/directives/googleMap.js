angular.module('finalProject')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
function googleMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      data: '='
    },
    link: function($scope, element) {
      $scope.$watch('data', () => {
        const map = new   $window.google.maps.Map(element[0], {
          center: {lat: $scope.data.map.polyline[0].lat, lng: $scope.data.map.polyline[0].lng},
          zoom: 14
        });
        
        const run = new $window.google.maps.Polyline({
          path: $scope.data.map.polyline,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        run.setMap(map);
      });
    }
  };
}
