angular.module('finalProject')
  .controller('MainController', MainController);

MainController.$inject = ['$auth','$state','User','UserPlan', '$window', '$scope'];
function MainController($auth, $state, User, UserPlan, $window, $scope){
  const main = this;
  const moment = $window.moment;

  main.isLoggedIn = $auth.isAuthenticated;
  main.hasActivePlan = false;
  $scope.uiRouterState = $state;

  function getUserId() {
    const userId = $auth.getPayload().id;
    $state.go('usersShow', {id: userId});
  }

  // Check if user has Strava account
  main.hasStrava = $window.localStorage.getItem('strava_token');

  if (main.isLoggedIn()) {
    main.currentUser = $auth.getPayload().id;

    // Get user data
    main.all = User.get({id: main.currentUser}, (res) => {
      res.user_plans.forEach((plan) => {
        if (plan.active) {
          main.activePlan = plan.id;

          // Get active user plan
          UserPlan.get({id: plan.id}, (data) => {

            // Check if plan has started
            const today = moment().format('YYYY-MM-DD');
            const startDate = moment(plan.start_date).format('YYYY-MM-DD');
            (startDate <= today) ?
              main.planStarted = false: main.planStarted = true;

            data.user_days.forEach((day) => {
              const date = moment(day.date).format('YYYY-MM-DD');
              if (date === today) {
                main.hasActivePlan = true;
                main.dayId = day.id;
              }
            });
          });
        }
      });
    });
  }


  function logout() {
    $auth.logout()
      .then(() => {
        $state.go('homepage');
      });
  }

  main.logout = logout;
  main.getUserId = getUserId;
}
