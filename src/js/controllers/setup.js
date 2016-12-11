angular.module('finalProject')
  .controller('SetupController', SetupController);

SetupController.$inject = ['UserPlan','$state'];
function SetupController(UserPlan, $state) {
  const setupPlan = this;

  function create(){
    UserPlan.save(setupPlan, () => {
      $state.go('plansIndex');
    });
  }

  setupPlan.create = create;
}
