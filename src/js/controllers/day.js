angular.module('finalProject')
  .controller('DaysIndexController', DaysIndexController)
  .controller('DaysShowController', DaysShowController);

DaysIndexController.$inject = ['UserPlan', '$state'];
function DaysIndexController(UserPlan, $state) {
  const daysIndex = this;

  daysIndex.plan = UserPlan.get($state.params);
}

DaysShowController.$inject = ['Day', '$state', '$window', 'StravaService'];
function DaysShowController(Day, $state, $window, StravaService) {
  const daysShow = this;

  daysShow.planId = $state.params.planId;
  daysShow.dayId = $state.params.dayId;

  daysShow.day = Day.get({ id: daysShow.dayId });

  if ($state.params.stravaId) {
    // Get activities from Strava
    const accessToken = $window.localStorage.getItem('strava_token');
    const stravaActivityId = $state.params.stravaId;


    StravaService
      .getActivity(accessToken, stravaActivityId)
      .then(
        successResponse => {
          daysShow.stravaData = successResponse;
          console.log(daysShow.stravaData);
        },
        errorResponse => {
          console.log(errorResponse);
        }
      );
  }

  function markDone(){
    daysShow.day.completed = true;
    Day.update(daysShow.dayId, daysShow.day);
  }

  daysShow.markDone = markDone;
}
