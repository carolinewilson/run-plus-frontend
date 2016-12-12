angular.module('finalProject')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('homepage', {
      url: '/',
      templateUrl: '/templates/homepage.html',
      controller: 'MainController as main'
    })
    .state('setup', {
      url: '/setup',
      templateUrl: '/templates/setup.html',
      controller: 'SetupController as setupPlan'
    })
    .state('plansIndex', {
      url: '/plans',
      templateUrl: '/templates/plansIndex.html',
      controller: 'PlansIndexController as plansIndex'
    })
    .state('plansShow', {
      url: '/plans/:id',
      templateUrl: '/templates/plansShow.html',
      controller: 'PlansShowController as plansShow'
    })
    .state('plansEdit', {
      url: '/plans/:id/end',
      templateUrl: '/templates/plansEdit.html',
      controller: 'PlansEditController as plansEdit'
    })
    .state('plansNew', {
      url: '/:id/new',
      templateUrl: '/templates/plansNew.html',
      controller: 'PlansNewController as plansNew'
    })
    .state('weeksShow', {
      url: '/plans/:planId/weeks/:weekId',
      templateUrl: '/templates/weeksShow.html',
      controller: 'WeeksShowController as weeksShow'
    })
    .state('weeksEdit', {
      url: '/plans/:planId/weeks/:weekId/edit',
      templateUrl: '/templates/weeksEdit.html',
      controller: 'WeeksEditController as weeksEdit'
    })
    .state('daysIndex', {
      url: '/plans/:id/days',
      templateUrl: '/templates/daysIndex.html',
      controller: 'DaysIndexController as daysIndex'
    })
    .state('daysShow', {
      url: '/plans/:planId/days/:dayId',
      templateUrl: '/templates/daysShow.html',
      controller: 'DaysShowController as daysShow'
    })
    .state('usersIndex', {
      url: '/users',
      templateUrl: '/templates/usersIndex.html',
      controller: 'UsersIndexController as usersIndex'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: '/templates/usersShow.html',
      controller: 'UsersShowController as usersShow'
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: '/templates/usersEdit.html',
      controller: 'UsersEditController as usersEdit'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'RegisterController as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController as login'
    });

  $urlRouterProvider.otherwise('/');
}
