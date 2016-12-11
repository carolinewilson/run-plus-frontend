angular.module('finalProject')
  .controller('MainController', MainController);

MainController.$inject = ['$auth','$state'];
function MainController($auth, $state){
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;

  if (main.isLoggedIn()) {
    main.currentUser = $auth.getPayload().id;
  }
  
  function logout() {
    $auth.logout()
      .then(() => {
        $state.go('homepage');
      });
  }
  main.logout = logout;
}
