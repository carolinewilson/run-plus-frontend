angular.module('finalProject')
  .controller('SetupController', SetupController);

SetupController.$inject = ['UserPlan','$state','$window'];
function SetupController(UserPlan, $state, $window) {
  const setupPlan = this;
  const moment = $window.moment;

  setupPlan.end_date = new Date(moment().add(6, 'weeks').format('YYYY-MM-DD'));

  function create(){
    UserPlan.save(setupPlan, () => {
      $state.go('plansIndex');
    });
  }

  setupPlan.create = create;
}
