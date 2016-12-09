angular.module('finalProject')
  .controller('PlansIndexController', PlansIndexController)
  .controller('PlansShowController', PlansShowController);

PlansIndexController.$inject = ['User', '$auth'];
function PlansIndexController(User, $auth) {
  const plansIndex = this;

  plansIndex.currentUser = $auth.getPayload().id;

  plansIndex.all = User.query();
}

PlansShowController.$inject = ['UserPlan' ,'$state'];
function PlansShowController(UserPlan, $state) {
  const plansShow = this;

  plansShow.plan = UserPlan.get($state.params, () => {

    plansShow.totalWorkouts = 0;
    plansShow.totalMiles = 0;
    plansShow.completedWorkouts = 0;
    plansShow.completedMiles = 0;

    plansShow.plan.user_days.forEach((day) => {
      // Find current week

      const date =  moment(day.date).format('YYYY-MM-DD');
      const today = moment().format('YYYY-MM-DD');
      if (date === today) {
        plansShow.currentWeek = day.week;
      }

      // Calculate total number of workout days
      if (day.exercise) {
        plansShow.totalWorkouts += 1;
        plansShow.totalMiles += day.exercise.miles;

        // Calculate num completed workouts
        if (day.completed) {
          plansShow.completedWorkouts += 1;
          plansShow.completedMiles += day.exercise.miles;
        }
      }
    });

    plansShow.totalMiles = Math.floor(plansShow.totalMiles);
    plansShow.completedMiles = Math.floor(plansShow.completedMiles);

  });
}
