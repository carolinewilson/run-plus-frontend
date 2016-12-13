angular.module('finalProject')
  .controller('UsersIndexController', UsersIndexController)
  .controller('UsersShowController', UsersShowController)
  .controller('UsersEditController', UsersEditController);

UsersIndexController.$inject = ['User'];
function UsersIndexController(User) {
  const usersIndex = this;

  usersIndex.all = User.query();
}

UsersShowController.$inject = ['User', '$state','$auth', '$window'];
function UsersShowController(User, $state, $auth, $window) {
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
        $window.localStorage.setItem('strava_token', res.data.access_token);

        usersShow.user.strava_id = res.data.athlete.id;

        User.update(usersShow.user.id, usersShow.user, (data) => {
          console.log(data);
        });
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
