angular.module('finalProject', ['ngResource', 'ui.router', 'satellizer','chart.js','dndLists','ngMessages','ngMaterial'])
  .constant('API_URL', window.location.hostname === 'localhost' ? 'http://localhost:3000/api' : '//final-project-api.herokuapp.com/api')
  .config(Auth);

Auth.$inject = ['$authProvider', 'API_URL'];
function Auth($authProvider, API_URL) {
  $authProvider.loginUrl = `${API_URL}/login`;
  $authProvider.signupUrl = `${API_URL}/register`;

  $authProvider.tokenPrefix = '';

  $authProvider.oauth2({
    name: 'strava',
    url: `${API_URL}/oauth/strava`,
    clientId: '15120',
    redirectUri: window.location.origin,
    authorizationEndpoint: 'https://www.strava.com/oauth/authorize'
  });
}
