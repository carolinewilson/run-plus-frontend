angular.module('finalProject')
  .controller('WeeksShowController', WeeksShowController)
  .controller('WeeksEditController', WeeksEditController);

WeeksShowController.$inject = ['UserPlan', '$state', '$window'];
function WeeksShowController(UserPlan, $state, $window) {
  const weeksShow = this;
  const moment = $window.moment;

  weeksShow.planId = $state.params.planId;
  weeksShow.weekId = $state.params.weekId;
  weeksShow.totalWorkouts = 0;
  weeksShow.completedWorkouts = 0;
  weeksShow.totalMiles = 0;
  weeksShow.completedMiles = 0;

  UserPlan.get({ id: weeksShow.planId, week: weeksShow.weekId}, (week) => {
    weeksShow.thisWeek = week.user_days;

    weeksShow.thisWeek.forEach((day) => {

      // Get day of week
      day.dayOfWeekIndex = moment(day.date).day();

      switch (day.dayOfWeekIndex) {
        case 1:
          day.dayOfWeek = 'M';
          break;
        case 2:
          day.dayOfWeek = 'T';
          break;
        case 3:
          day.dayOfWeek = 'W';
          break;
        case 4:
          day.dayOfWeek = 'T';
          break;
        case 5:
          day.dayOfWeek = 'F';
          break;
        case 6:
          day.dayOfWeek = 'S';
          break;
        case 0:
          day.dayOfWeek = 'S';
          break;
      }

      if (day.exercise) {
        // Calculate total number of workout days
        weeksShow.totalWorkouts += 1;
        weeksShow.totalMiles += day.exercise.miles;

        // Calculate num completed workouts
        if (day.completed) {
          weeksShow.completedWorkouts += 1;
          weeksShow.completedMiles += day.exercise.miles;
        }
      }
    });
    
    weeksShow.totalMiles = Math.floor(weeksShow.totalMiles);
    weeksShow.completedMiles = Math.floor(weeksShow.completedMiles);

  });
}

WeeksEditController.$inject = ['UserPlan', '$state', '$window'];
function WeeksEditController(UserPlan, $state, $window) {
  const weeksEdit = this;
  const moment = $window.moment;

  weeksEdit.planId = $state.params.planId;
  weeksEdit.weekId = $state.params.weekId;

  UserPlan.get({ id: weeksEdit.planId, week: weeksEdit.weekId }, (plan) => {
    weeksEdit.plan = plan;

    plan.user_days.forEach((day) => {
      // Get day of week
      day.dayOfWeekIndex = moment(day.date).day();

      switch (day.dayOfWeekIndex) {
        case 1:
          day.dayOfWeek = 'M';
          break;
        case 2:
          day.dayOfWeek = 'T';
          break;
        case 3:
          day.dayOfWeek = 'W';
          break;
        case 4:
          day.dayOfWeek = 'T';
          break;
        case 5:
          day.dayOfWeek = 'F';
          break;
        case 6:
          day.dayOfWeek = 'S';
          break;
        case 0:
          day.dayOfWeek = 'S';
          break;
      }
    });
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
