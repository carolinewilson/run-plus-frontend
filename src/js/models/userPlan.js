angular.module('finalProject')
  .factory('UserPlan', UserPlan);

UserPlan.$inject = ['$resource', 'API_URL'];
function UserPlan($resource, API_URL) {
  return new $resource(`${API_URL}/user_plans/:id`, { id: '@id'}, {
    update: { method: 'PUT'}
  });
}
