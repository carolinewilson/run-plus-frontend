angular.module('finalProject')
  .controller('MainController', MainController);

MainController.$inject = ['$auth','$state'];
function MainController($auth, $state){
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;

  function logout() {
    $auth.logout()
      .then(() => {
        // $window.localStorage.removeItem('token');
        $state.go('login');
      });
  }
  main.logout = logout;
}
