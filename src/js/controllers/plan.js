angular.module('finalProject')
  .controller('PlansIndexController', PlansIndexController)
  .controller('PlansShowController', PlansShowController)
  .controller('PlansEditController', PlansEditController)
  .controller('PlansNewController', PlansNewController);

PlansIndexController.$inject = ['User', '$auth'];
function PlansIndexController(User, $auth) {
  const plansIndex = this;

  plansIndex.currentUser = $auth.getPayload().id;
  plansIndex.all = User.get({id: plansIndex.currentUser}, () => {
    plansIndex.all.user_plans.forEach((plan) => {
      if (plan.active) {
        plansIndex.hasActivePlan = true;
      }
    });

  });
}

PlansShowController.$inject = ['UserPlan' ,'$state','$window'];
function PlansShowController(UserPlan, $state, $window, $auth) {
  const plansShow = this;
  const moment = $window.moment;

  plansShow.plan = UserPlan.get($state.params, () => {

    plansShow.totalWorkouts = 0;
    plansShow.totalMiles = 0;
    plansShow.completedWorkouts = 0;
    plansShow.completedMiles = 0;
    plansShow.labels = [];
    plansShow.series = ['Target', 'Actual'];
    plansShow.targetData = [];
    plansShow.actualData =[];
    plansShow.colors = ['#45b7cd', '#ff6384'];

    // Check if plan has started
    if (plansShow.plan.active) {
      const start = moment(plansShow.plan.start_date).format('YYYY-MM-DD');
      const today =  moment().format('YYYY-MM-DD');

      if (start > today) {
        plansShow.plan.future = true;
      }
    }

    // Check if user has Strava account
    plansShow.hasStrava = $window.localStorage.getItem('strava_token');

    // Set up chart
    const numWeeks = plansShow.plan.user_days.length / 7;
    for (var i = 0; i < numWeeks; i++) {
      plansShow.labels.push(`Week ${i+1}`);
      plansShow.targetMiles = 0;
      plansShow.actualMiles = 0;

      // Aggregate weekly mileage
      plansShow.plan.user_days.forEach((day) => {
        if (day.week === i + 1) {
          if (day.exercise) {
            plansShow.targetMiles += day.exercise.miles;
          }
          if (day.completed) {
            plansShow.actualMiles += day.exercise.miles;
          }
        }
      });

      plansShow.targetData.push(plansShow.targetMiles);
      plansShow.actualData.push(plansShow.actualMiles);
    }
    plansShow.data = [plansShow.targetData, plansShow.actualData];

    plansShow.plan.user_days.forEach((day) => {
      // Find current week
      const date =  moment(day.date).format('YYYY-MM-DD');
      const today = moment().format('YYYY-MM-DD');
      if (date === today) {
        plansShow.currentWeek = day.week;
      }

      if (day.exercise) {
        // Calculate total number of workout days
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

PlansEditController.$inject = ['$state', 'UserPlan'];
function PlansEditController($state, UserPlan) {
  const plansEdit = this;

  plansEdit.plan = UserPlan.get($state.params);

  function endPlan() {
    plansEdit.plan.active = false;
    UserPlan.update($state.params,plansEdit.plan, () => {
      $state.go('plansIndex');
    });
  }

  function deletePlan() {
    UserPlan.remove($state.params, () => {
      $state.go('plansIndex');
    });
  }

  plansEdit.endPlan = endPlan;
  plansEdit.deletePlan = deletePlan;
}


PlansNewController.$inject = ['User', 'UserPlan', '$state'];
function PlansNewController(User, UserPlan, $state) {
  const plansNew = this;

  User.get($state.params, (user) => {
    plansNew.userPlans = user.user_plans;
    plansNew.hasActivePlan = false;

    plansNew.userPlans.forEach((plan) => {
      if (plan.active === true) {
        plansNew.hasActivePlan = true;
        plansNew.activePlan = plan;
      }
    });

    if (!plansNew.hasActivePlan){
      $state.go('setup');
    }
  });

  function endPlan(id) {
    plansNew.activePlan.active = false;
    UserPlan.update(id, plansNew.activePlan, () => {
      $state.go('setup');
    });
  }
  plansNew.endPlan = endPlan;
}
