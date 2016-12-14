"use strict";function Auth(e,t){e.loginUrl=t+"/login",e.signupUrl=t+"/register",e.tokenPrefix="",e.oauth2({name:"strava",url:t+"/oauth/strava",clientId:"15120",redirectUri:window.location.origin,authorizationEndpoint:"https://www.strava.com/oauth/authorize"})}function RegisterController(e,t,a){function r(){e.signup(o.user).then(function(e){a.localStorage.setItem("token",e.data.token),t.go("setup")})}var o=this;o.user={},o.submit=r}function LoginController(e,t){function a(){e.login(r.credentials).then(function(e){e.data.user.user_plans.forEach(function(e){e.active&&(r.activePlans=!0)}),r.activePlans?t.go("plansIndex"):t.go("setup")})}var r=this;r.credentials={},r.activePlans=!1,r.submit=a}function DaysIndexController(e,t){var a=this;a.plan=e.get(t.params)}function DaysShowController(e,t,a,r){function o(){l.day.completed=!0,e.update(l.dayId,l.day)}var l=this;if(l.planId=t.params.planId,l.dayId=t.params.dayId,l.day=e.get({id:l.dayId}),t.params.stravaId){var n=a.localStorage.getItem("strava_token"),s=t.params.stravaId;r.activityShow(n,s).then(function(e){l.stravaData=e},function(e){console.log(e)})}l.markDone=o}function Day(e,t){return new e(t+"/user_days/:id",{id:"@id"},{update:{method:"PUT"}})}function daysList(){return{restrict:"E",replace:!0,templateUrl:"templates/daysList.html",scope:{days:"=",plan:"="}}}function googleMap(e){return{restrict:"E",replace:!0,template:'<div class="google-map"></div>',scope:{data:"="},link:function(t,a){t.$watch("data",function(){var r=new e.google.maps.Map(a[0],{center:{lat:t.data[0].lat,lng:t.data[0].lng},zoom:14,disableDefaultUI:!0,zoomControl:!0,scaleControl:!0,scrollwheel:!1}),o=new e.google.maps.Polyline({path:t.data,geodesic:!0,strokeColor:"#FF0000",strokeOpacity:1,strokeWeight:2});o.setMap(r)})}}}function MainController(e,t,a,r,o,l,n,s){function i(){var a=e.getPayload().id;t.go("usersShow",{id:a})}function c(){e.logout().then(function(){t.go("homepage")})}var d=this,u=o.moment;n.hash("top"),s(),d.isLoggedIn=e.isAuthenticated,d.hasActivePlan=!1,l.uiRouterState=t,d.hasStrava=o.localStorage.getItem("strava_token"),d.isLoggedIn()&&(d.currentUser=e.getPayload().id,d.all=a.get({id:d.currentUser},function(e){e.user_plans.forEach(function(e){e.active&&(d.activePlan=e.id,r.get({id:e.id},function(t){var a=u().format("YYYY-MM-DD"),r=u(e.start_date).format("YYYY-MM-DD");r<=a?d.planStarted=!1:d.planStarted=!0,t.user_days.forEach(function(e){var t=u(e.date).format("YYYY-MM-DD");t===a&&(d.hasActivePlan=!0,d.dayId=e.id)})}))})})),d.logout=c,d.getUserId=i}function PlansIndexController(e,t){var a=this;a.currentUser=t.getPayload().id,a.all=e.get({id:a.currentUser},function(){a.all.user_plans.forEach(function(e){e.active&&(a.hasActivePlan=!0)})})}function PlansShowController(e,t,a){var r=this,o=a.moment;r.plan=e.get(t.params,function(){if(r.totalWorkouts=0,r.totalMiles=0,r.completedWorkouts=0,r.completedMiles=0,r.labels=[],r.series=["Target","Actual"],r.targetData=[],r.actualData=[],r.colors=["#45b7cd","#ff6384"],r.plan.active){var e=o(r.plan.start_date).format("YYYY-MM-DD"),t=o().format("YYYY-MM-DD");e>t?r.plan.future=!0:r.plan.future=!1,console.log(r.plan.future)}r.hasStrava=a.localStorage.getItem("strava_token");for(var l=r.plan.user_days.length/7,n=0;n<l;n++)r.labels.push("Week "+(n+1)),r.targetMiles=0,r.actualMiles=0,r.plan.user_days.forEach(function(e){e.week===n+1&&(e.exercise&&(r.targetMiles+=e.exercise.miles),e.completed&&(r.actualMiles+=e.exercise.miles))}),r.targetData.push(r.targetMiles),r.actualData.push(r.actualMiles);r.data=[r.targetData,r.actualData],r.plan.user_days.forEach(function(e){var t=o(e.date).format("YYYY-MM-DD"),a=o().format("YYYY-MM-DD");t===a&&(r.currentWeek=e.week),e.exercise&&(r.totalWorkouts+=1,r.totalMiles+=e.exercise.miles,e.completed&&(r.completedWorkouts+=1,r.completedMiles+=e.exercise.miles))}),r.totalMiles=Math.floor(r.totalMiles),r.completedMiles=Math.floor(r.completedMiles)})}function PlansEditController(e,t){function a(){o.plan.active=!1,t.update(e.params,o.plan,function(){e.go("plansIndex")})}function r(){t.remove(e.params,function(){e.go("plansIndex")})}var o=this;o.plan=t.get(e.params),o.endPlan=a,o.deletePlan=r}function PlansNewController(e,t,a){function r(e){o.activePlan.active=!1,t.update(e,o.activePlan,function(){a.go("setup")})}var o=this;e.get(a.params,function(e){o.userPlans=e.user_plans,o.hasActivePlan=!1,o.userPlans.forEach(function(e){e.active===!0&&(o.hasActivePlan=!0,o.activePlan=e)}),o.hasActivePlan||a.go("setup")}),o.endPlan=r}function Router(e,t){e.state("homepage",{url:"/",templateUrl:"/templates/homepage.html",controller:"MainController as main"}).state("setup",{url:"/setup",templateUrl:"/templates/setup.html",controller:"SetupController as setupPlan"}).state("plansIndex",{url:"/plans",templateUrl:"/templates/plansIndex.html",controller:"PlansIndexController as plansIndex"}).state("plansShow",{url:"/plans/:id",templateUrl:"/templates/plansShow.html",controller:"PlansShowController as plansShow"}).state("plansEdit",{url:"/plans/:id/end",templateUrl:"/templates/plansEdit.html",controller:"PlansEditController as plansEdit"}).state("plansNew",{url:"/:id/new",templateUrl:"/templates/plansNew.html",controller:"PlansNewController as plansNew"}).state("weeksShow",{url:"/plans/:planId/weeks/:weekId",templateUrl:"/templates/weeksShow.html",controller:"WeeksShowController as weeksShow"}).state("weeksEdit",{url:"/plans/:planId/weeks/:weekId/edit",templateUrl:"/templates/weeksEdit.html",controller:"WeeksEditController as weeksEdit"}).state("daysIndex",{url:"/plans/:id/days",templateUrl:"/templates/daysIndex.html",controller:"DaysIndexController as daysIndex"}).state("daysShow",{url:"/plans/:planId/days/:dayId?stravaId",templateUrl:"/templates/daysShow.html",controller:"DaysShowController as daysShow"}).state("stravaIndex",{url:"/strava",templateUrl:"/templates/stravaIndex.html",controller:"StravaIndexController as stravaIndex"}).state("usersIndex",{url:"/users",templateUrl:"/templates/usersIndex.html",controller:"UsersIndexController as usersIndex"}).state("usersShow",{url:"/users/:id",templateUrl:"/templates/usersShow.html",controller:"UsersShowController as usersShow"}).state("usersEdit",{url:"/users/:id/edit",templateUrl:"/templates/usersEdit.html",controller:"UsersEditController as usersEdit"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}),t.otherwise("/")}function SetupController(e,t,a){function r(){e.save(o,function(){t.go("plansIndex")})}var o=this,l=a.moment;o.end_date=new Date(l().add(6,"weeks").format("YYYY-MM-DD")),o.create=r}function StravaIndexController(e,t,a,r,o,l,n,s){function i(e){for(var t=function(t){var a=d.userDays.findIndex(function(a){return u(a.date).format("YYYY-MM-DD")===e[t].start_date});a>0&&(e[t].userDay=d.userDays.splice(a,1)[0])},a=0;a<e.length;a++)t(a);return e}function c(e,t,a){l.get({id:t},function(r){r.completed=!0,r.strava_id=a,l.update(r,r,function(){s.go("daysShow",{planId:e,dayId:t,stravaId:a})})})}var d=this,u=n.moment,p=a.getPayload().id;d.allActivities=[],d.userDays=[];var m=n.localStorage.getItem("strava_token");o.query({user_id:p,active:!0}).$promise.then(function(e){if(d.planId=e[0].id,d.userDays=e[0].user_days,m)return t.activityIndex(m)}).then(function(e){d.allActivities=i(e||[]);var t=d.userDays.filter(function(e){return e.completed});d.allActivities.concat(t)}).catch(function(e){console.log(e)}),d.markComplete=c}function StravaService(e,t){function a(t){return e({method:"GET",url:"http://localhost:3000/api/strava",params:{accessToken:t}}).then(function(e){return e.data.forEach(function(e){e.start_date=o(e.start_date).format("YYYY-MM-DD"),e.distance=(e.distance/1e3*.621371).toFixed(1),e.elapsed_hours=Math.floor(e.elapsed_time/60/60),e.elapsed_minutes=Math.floor(e.elapsed_time/60%60),e.elapsed_seconds=(e.elapsed_time%60*60).toString().slice(0,2)%60}),e.data},function(e){console.log(e)})}function r(t,a){return e({method:"GET",url:"http://localhost:3000/api/strava/activity",params:{activityId:a,accessToken:t}}).then(function(e){return e.data.distance=(e.data.distance/1e3*.621371).toFixed(1),e.data.elapsed_minutes=Math.floor(e.data.elapsed_time/60),e.data.elapsed_seconds=e.data.elapsed_time%60*60,e.data},function(e){console.log(e)})}var o=t.moment;this.activityIndex=a,this.activityShow=r}function User(e,t){return new e(t+"/users/:id",{id:"@id"},{update:{method:"PUT"}})}function UserPlan(e,t){return new e(t+"/user_plans/:id",{id:"@id"},{update:{method:"PUT"}})}function UsersIndexController(e){var t=this;t.all=e.query()}function UsersShowController(e,t,a,r){function o(){s.user.$remove(function(){t.go("usersIndex")})}function l(){a.logout().then(function(){r.localStorage.removeItem("strava_token"),t.go("homepage")})}function n(){a.authenticate("strava").then(function(a){r.localStorage.setItem("strava_token",a.data.access_token),s.user.strava_id=a.data.athlete.id,e.update(s.user.id,s.user,function(){t.go("stravaIndex")})})}var s=this;s.user=e.get(t.params),s.logout=l,s.delete=o,s.authenticateStrava=n}function UsersEditController(e,t){function a(){e.update(r.user.id,r.user,function(){t.go("usersShow",t.params)})}var r=this;r.user=e.get(t.params),r.update=a}function WeeksShowController(e,t){var a=this;a.planId=t.params.planId,a.weekId=t.params.weekId,a.totalWorkouts=0,a.completedWorkouts=0,a.totalMiles=0,a.completedMiles=0,e.get({id:a.planId,week:a.weekId},function(e){a.thisWeek=e.user_days,a.thisWeek.forEach(function(e){e.exercise&&(a.totalWorkouts+=1,a.totalMiles+=e.exercise.miles,e.completed&&(a.completedWorkouts+=1,a.completedMiles+=e.exercise.miles))}),console.log(a.thisWeek),a.totalMiles=Math.floor(a.totalMiles),a.completedMiles=Math.floor(a.completedMiles)})}function WeeksEditController(e,t){function a(e){var t=o.startingDay.position;o.thisWeek.splice(e,1),o.thisWeek.forEach(function(e){e.position=t,t++})}function r(){e.update(o.planId,o.plan)}var o=this;o.planId=t.params.planId,o.weekId=t.params.weekId,e.get({id:o.planId,week:o.weekId},function(e){o.plan=e,o.thisWeek=e.user_days.sort(function(e,t){return e.position-t.position}),o.startingDay=e.user_days[0]}),o.updatePosition=a,o.savePlan=r}angular.module("finalProject",["ngResource","ui.router","satellizer","chart.js","dndLists","ngMessages","ngMaterial"]).constant("API_URL","http://localhost:3000/api").config(Auth),Auth.$inject=["$authProvider","API_URL"],angular.module("finalProject").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state","$window"],LoginController.$inject=["$auth","$state"],angular.module("finalProject").controller("DaysIndexController",DaysIndexController).controller("DaysShowController",DaysShowController),DaysIndexController.$inject=["UserPlan","$state"],DaysShowController.$inject=["Day","$state","$window","StravaService"],angular.module("finalProject").factory("Day",Day),Day.$inject=["$resource","API_URL"],angular.module("finalProject").directive("daysList",daysList),angular.module("finalProject").directive("googleMap",googleMap),googleMap.$inject=["$window"],angular.module("finalProject").controller("MainController",MainController),MainController.$inject=["$auth","$state","User","UserPlan","$window","$scope","$location","$anchorScroll"],angular.module("finalProject").controller("PlansIndexController",PlansIndexController).controller("PlansShowController",PlansShowController).controller("PlansEditController",PlansEditController).controller("PlansNewController",PlansNewController),PlansIndexController.$inject=["User","$auth"],PlansShowController.$inject=["UserPlan","$state","$window"],PlansEditController.$inject=["$state","UserPlan"],PlansNewController.$inject=["User","UserPlan","$state"],angular.module("finalProject").config(Router),Router.$inject=["$stateProvider","$urlRouterProvider"],angular.module("finalProject").controller("SetupController",SetupController),SetupController.$inject=["UserPlan","$state","$window"],angular.module("finalProject").controller("StravaIndexController",StravaIndexController),StravaIndexController.$inject=["$http","StravaService","$auth","User","UserPlan","Day","$window","$state"],angular.module("finalProject").service("StravaService",StravaService),StravaService.$inject=["$http","$window"],angular.module("finalProject").factory("User",User),User.$inject=["$resource","API_URL"],angular.module("finalProject").factory("UserPlan",UserPlan),UserPlan.$inject=["$resource","API_URL"],angular.module("finalProject").controller("UsersIndexController",UsersIndexController).controller("UsersShowController",UsersShowController).controller("UsersEditController",UsersEditController),UsersIndexController.$inject=["User"],UsersShowController.$inject=["User","$state","$auth","$window"],UsersEditController.$inject=["User","$state"],angular.module("finalProject").controller("WeeksShowController",WeeksShowController).controller("WeeksEditController",WeeksEditController),WeeksShowController.$inject=["UserPlan","$state"],WeeksEditController.$inject=["UserPlan","$state"];
//# sourceMappingURL=app.js.map
