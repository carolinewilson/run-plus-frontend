angular.module('finalProject')
  .controller('UsersIndexController', UsersIndexController)
  .controller('UsersShowController', UsersShowController)
  .controller('UsersEditController', UsersEditController);

UsersIndexController.$inject = ['User'];
function UsersIndexController(User) {
  const usersIndex = this;

  usersIndex.all = User.query();
}

UsersShowController.$inject = ['User', '$state'];
function UsersShowController(User, $state) {
  const usersShow = this;
  usersShow.user = User.get($state.params);

  function userDelete() {
    usersShow.user.$remove(() => {
      $state.go('usersIndex');
    });
  }
  usersShow.delete = userDelete;
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
