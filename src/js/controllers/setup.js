angular.module('finalProject')
  .controller('SetupController', SetupController);

SetupController.$inject = ['UserPlan','$state','$scope'];
function SetupController(UserPlan, $state, $scope) {
  const setupPlan = this;

  function create(){
    UserPlan.save(setupPlan, () => {
      $state.go('plansIndex');
    });
  }

  // Date Picker
  $scope.myDate = new Date();

  $scope.minDate = new Date(
    $scope.myDate.getFullYear(),
    $scope.myDate.getMonth() - 2,
    $scope.myDate.getDate());

  $scope.maxDate = new Date(
    $scope.myDate.getFullYear(),
    $scope.myDate.getMonth() + 2,
    $scope.myDate.getDate());

  $scope.onlyWeekendsPredicate = function(date) {
    var day = date.getDay();
    return day === 0 || day === 6;
  };

  setupPlan.create = create;
}
