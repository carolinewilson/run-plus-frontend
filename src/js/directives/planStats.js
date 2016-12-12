angular.module('finalProject')
  .directive('planStats', planStats);


function planStats() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/planStats.html',
    scope: {
      compWo: '=',
      totWo: '=',
      compMi: '=',
      totMi: '='
    }
  };
}
