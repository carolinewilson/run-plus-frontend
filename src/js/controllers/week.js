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

  UserPlan.get({ id: weeksEdit.planId, week: weeksEdit.weekId }, (plan) => {
    weeksEdit.plan = plan;
    weeksEdit.thisWeek = plan.user_days.sort(function(a,b) {
      return a.position - b.position;
    });
    weeksEdit.startingDay = plan.user_days[0];
  });

  function updatePosition($index){
    let index = weeksEdit.startingDay.position;
    weeksEdit.thisWeek.splice($index, 1);
    weeksEdit.thisWeek.forEach((day) => {
      day.position = index;
      index++;
    });
  }

  function savePlan(){
    UserPlan.update(weeksEdit.planId, weeksEdit.plan);
  }
  
  weeksEdit.updatePosition = updatePosition;
  weeksEdit.savePlan = savePlan;
}
