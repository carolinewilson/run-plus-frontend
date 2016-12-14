angular.module('finalProject')
  .controller('RegisterController', RegisterController)
  .controller('LoginController', LoginController);

RegisterController.$inject = ['$auth', '$state','$window'];
function RegisterController($auth, $state, $window) {
  const register = this;

  register.user = {};

  function submit() {
    $auth.signup(register.user)
      .then((res) => {
        $window.localStorage.setItem('token', res.data.token);
        $state.go('setup');
      });
  }

  register.submit = submit;
}

LoginController.$inject = ['$auth', '$state'];
function LoginController($auth, $state) {
  const login = this;

  login.credentials = {};
  login.activePlans = false;

  function submit() {
    $auth.login(login.credentials)
      .then((res) => {
        res.data.user.user_plans.forEach((plan) => {
          if (plan.active) {
            login.activePlans = true;
          }
        });

        if (login.activePlans) {
          $state.go('plansIndex');
        } else {
          $state.go('setup');
        }
      });
  }

  login.submit = submit;
}
