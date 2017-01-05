# Run +
A web application for runners looking to train for a running event. Users can get customisable training plans and monitor their progress. The app is fully integrated with Strava for easy syncing with wearable tracking devices.

Use the app [here](https://run-plus.herokuapp.com).

![Run +](https://run-plus.herokuapp.com/images/run-plus.png)

##The Idea
I wanted to build an app that would allow me to generate a training plan for an event date that I'm able to customise based on my weekly commitments, and to monitor my progress against targets over the course of the plan.

As a runner myself, I've always found it difficult to find training plans that are customisible &amp; trackable. I've resorted to copying workouts to a calendar and modifying based on my commitments, making it hard to monitor progress. 

With Run +, users select their race distance, fitness level and race date and are provided with a suitable training plan. Workouts each week and be rearranged to suit the users wishes. User can update their progress after each completed workout to instantly update their statistics.

To add an extra layer of convenience to this, I wanted to integrate the app with a third party tracking platform to automatically import users workouts. As I run with a Garmin watch the Strava API provided a wonderful solution to this. 

Users must first authenticate with Strava to allow access to their data, then with the click of a button, all users workouts are imported to the app and available to view in the activity feed.   

![Run + Activity Feed](https://run-plus.herokuapp.com/images/run-plus-feed.png)

##The Build
The app was built using a PostgreSQL database on a Ruby on the Rails Backend, with Angular on the Frontend and Skeleton for responsive CSS. The app is responsive but intended for use on a mobile device.

I used the [acts as list](https://github.com/swanandp/acts_as_list) gem in conjunction with an [iOS shim](https://github.com/timruffles/ios-html5-drag-drop-shim) to enable reordering of the weekly workout list on mobile and desktop devices. 

The [HTTParty](https://github.com/jnunemaker/httparty) gem was used to enable the Strava OAuth and API integrations. 

Polyline data that plots the course of a users run is provided by Strava in an encoded format. The [Google Maps Service](https://github.com/edwardsamuel/google-maps-services-ruby) gem was used to decode these polylines before plotting on a Google Map.

AngularJS v1.6 was used for the frontend build and includes [Satellizer](https://github.com/sahat/satellizer) for authentication and [Angular Chart](https://jtblin.github.io/angular-chart.js/).

##Selected Features
###Customising Plans
Users can change the order of the workouts that have been planned for the week by dragging and dropping to reorder. To maintain the value of the plan and prevent over/under working out, users are restricted to moving workouts within weeks and not across them. 


###Activity Feed
The activity feed displays a chronological list of the users completed activities. Users that opt to sync their account with Strava will see a blend of their app tracked and Strava tracked activities. Activities imported from Strava are matched to the users training plan; any matches are merged to enable the user to update their training plan with one click. 

##View the App
You can view the app [here](https://run-plus.herokuapp.com).

A demo account can be accessed with the credentials:

* Email: *demo@runplus.com*
* Password: *RunPlus123*