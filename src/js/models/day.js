angular.module('finalProject')
  .factory('Day', Day);

Day.$inject = ['$resource', 'API_URL'];
function Day($resource, API_URL) {
  return new $resource(`${API_URL}/user_days/:id`, { id: '@id'}, {
    update: { method: 'PUT'}
  });
}
