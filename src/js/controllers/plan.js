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
    plansShow.completedWorkouts = 0;

    plansShow.plan.user_days.forEach((day) => {
      // Calculate total number of workout days
      if (day.exercise) {
        plansShow.totalWorkouts += 1;

        // Calculate num completed workouts
        if (day.completed) {
          plansShow.completedWorkouts += 1;
        }
      }
    });

    // Calculate total milage of plan
    plansShow.totalMiles = 0;
    plansShow.completedMiles = 0;

    plansShow.plan.user_days.forEach((day) => {
      if (day.exercise) {
        plansShow.totalMiles += day.exercise.miles;

        // Calculate num completed miles
        if (day.completed) {
          plansShow.completedMiles += day.exercise.miles;
        }
      }
    });

    plansShow.totalMiles = Math.floor(plansShow.totalMiles);
    plansShow.completedMiles = Math.floor(plansShow.completedMiles);

  });
}
