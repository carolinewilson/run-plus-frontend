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

  setupPlan.distanceVisible = true;
  setupPlan.activityVisible = false;
  setupPlan.dateVisible = false;
  setupPlan.planVisible = false;

  function showDistance(){
    setupPlan.distanceVisible = true;
    setupPlan.activityVisible = false;
    setupPlan.dateVisible = false;
    setupPlan.planVisible = false;
  }
  function showActivity(){
    setupPlan.distanceVisible = false;
    setupPlan.activityVisible = true;
    setupPlan.dateVisible = false;
    setupPlan.planVisible = false;
  }
  function showDate(){
    setupPlan.distanceVisible = false;
    setupPlan.activityVisible = false;
    setupPlan.dateVisible = true;
    setupPlan.planVisible = false;
  }
  function showPlan(){
    setupPlan.distanceVisible = false;
    setupPlan.activityVisible = false;
    setupPlan.dateVisible = false;
    setupPlan.planVisible = true;
  }

  setupPlan.showActivity = showActivity;
  setupPlan.showDate = showDate;
  setupPlan.showPlan = showPlan;
  setupPlan.showDistance = showDistance;
  setupPlan.create = create;
}
