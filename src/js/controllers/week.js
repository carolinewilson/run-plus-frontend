angular.module('finalProject')
  .controller('WeeksShowController', WeeksShowController)
  .controller('WeeksEditController', WeeksEditController);

WeeksShowController.$inject = ['UserPlan', '$state'];
function WeeksShowController(UserPlan, $state) {
  const weeksShow = this;

  weeksShow.planId = $state.params.planId;
  weeksShow.weekId = $state.params.weekId;

  weeksShow.plan = UserPlan.get({ id: weeksShow.planId }, () => {
    weeksShow.thisWeek = [];

    weeksShow.plan.user_days.forEach((day) => {
      if (day.week == weeksShow.weekId) {
        weeksShow.thisWeek.push(day);
      }
    });
  });
}

WeeksEditController.$inject = ['UserPlan', '$state'];
function WeeksEditController(UserPlan, $state) {
  const weeksEdit = this;

  weeksEdit.planId = $state.params.planId;
  weeksEdit.weekId = $state.params.weekId;

  weeksEdit.plan = UserPlan.get({ id: weeksEdit.planId }, () => {
    weeksEdit.thisWeek = [];

    weeksEdit.plan.user_days.forEach((day) => {
      if (day.week == weeksEdit.weekId) {
        weeksEdit.thisWeek.push(day);
      }
    });
  });
}
