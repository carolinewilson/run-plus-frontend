angular.module('finalProject')
  .controller('PlansIndexController', PlansIndexController)
  .controller('PlansShowController', PlansShowController);

PlansIndexController.$inject = ['User', '$auth'];
function PlansIndexController(User, $auth) {
  const plansIndex = this;

  plansIndex.currentUser = $auth.getPayload().id;
  plansIndex.all = User.get({id: plansIndex.currentUser});
}

PlansShowController.$inject = ['UserPlan' ,'$state','$window'];
function PlansShowController(UserPlan, $state, $window) {
  const plansShow = this;
  const moment = $window.moment;

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

    plansShow.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    plansShow.series = ['Plan', 'Actual'];

    plansShow.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];

  });
}
