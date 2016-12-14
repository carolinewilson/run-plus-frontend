angular.module('finalProject')
  .directive('daysList', daysList);

function daysList() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/daysList.html',
    scope: {
      days: '=',
      plan: '='
    // },
    // link: function($scope) {
      // console.log($scope);
    }
  };
}
