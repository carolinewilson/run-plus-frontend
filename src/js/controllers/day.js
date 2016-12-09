angular.module('finalProject')
  .controller('DaysIndexController', DaysIndexController)
  .controller('DaysShowController', DaysShowController);

DaysIndexController.$inject = ['UserPlan', '$state'];
function DaysIndexController(UserPlan, $state) {
  const daysIndex = this;

  daysIndex.plan = UserPlan.get($state.params);
}

DaysShowController.$inject = ['Day', '$state'];
function DaysShowController(Day, $state) {
  const daysShow = this;

  daysShow.planId = $state.params.planId;
  daysShow.dayId = $state.params.dayId;

  daysShow.day = Day.get({ id: daysShow.dayId });

  function markDone(){
    daysShow.day.completed = true;
    Day.update(daysShow.dayId, daysShow.day);
  }

  daysShow.markDone = markDone;
}
