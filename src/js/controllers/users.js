angular.module('finalProject')
  .controller('UsersIndexController', UsersIndexController)
  .controller('UsersShowController', UsersShowController)
  .controller('UsersEditController', UsersEditController);

UsersIndexController.$inject = ['User'];
function UsersIndexController(User) {
  const usersIndex = this;

  usersIndex.all = User.query();
}

UsersShowController.$inject = ['User', '$state','$auth', '$window', 'StravaService'];
function UsersShowController(User, $state, $auth, $window, StravaService) {
  const usersShow = this;
  usersShow.user = User.get($state.params);

  function userDelete() {
    usersShow.user.$remove(() => {
      $state.go('usersIndex');
    });
  }

  function logout() {
    $auth.logout()
      .then(() => {
        $window.localStorage.removeItem('strava_token');
        $state.go('homepage');
      });
  }

  function authenticateStrava() {
    $auth.authenticate('strava')
      .then((res) => {
        // console.log(res);
        $window.localStorage.setItem('strava_token', res.data.access_token);

        usersShow.user.strava_id = res.data.athlete.id;

        // console.log(usersShow.user);

        // User.update($state.params.id, usersShow.user, (data) => {
        //   console.log(data);
        // });

        // StravaService
        //   .getActivities(res.data.access_token)
        //   .then(
        //     successResponse => {
        //       console.log(successResponse);
        //       usersShow.user.stravaData = successResponse;
        //     },
        //     errorResponse => {
        //       console.log(errorResponse);
        //     }
        //   );
      });
  }

  usersShow.logout = logout;
  usersShow.delete = userDelete;
  usersShow.authenticateStrava = authenticateStrava;
}

UsersEditController.$inject = ['User', '$state'];
function UsersEditController(User, $state) {
  const usersEdit = this;

  usersEdit.user = User.get($state.params);

  function update() {
    User.update(usersEdit.user.id, usersEdit.user, () => {
      $state.go('usersShow', $state.params);
    });
  }

  usersEdit.update = update;
}
