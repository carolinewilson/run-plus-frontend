angular.module('finalProject')
  .controller('DaysIndexController', DaysIndexController)
  .controller('DaysShowController', DaysShowController);

DaysIndexController.$inject = ['UserPlan', '$state','$window'];
function DaysIndexController(UserPlan, $state, $window) {
  const daysIndex = this;
  const moment = $window.moment;

  UserPlan.get($state.params, (res) => {
    res.user_days.forEach((day) => {
      // Get day of week
      day.dayOfWeekIndex = moment(day.date).day();

      switch (day.dayOfWeekIndex) {
        case 1:
          day.dayOfWeek = 'M';
          break;
        case 2:
          day.dayOfWeek = 'T';
          break;
        case 3:
          day.dayOfWeek = 'W';
          break;
        case 4:
          day.dayOfWeek = 'T';
          break;
        case 5:
          day.dayOfWeek = 'F';
          break;
        case 6:
          day.dayOfWeek = 'S';
          break;
        case 0:
          day.dayOfWeek = 'S';
          break;
      }
    });
    daysIndex.plan = res;
  });

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
      .activityShow(accessToken, stravaActivityId)
      .then(
        successResponse => {
          daysShow.stravaData = successResponse;
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
