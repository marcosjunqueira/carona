'use strict';

/* App Module */

var carona = angular.module('carona', ['ngResource', 'datetime', 'ui.bootstrap', 'geoServices', '$strap.directives']).
        config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
                when('/', {templateUrl: 'templates/index.html'}).
                when('/search', {templateUrl: 'templates/search.html', controller: SearchCtrl}).
                when('/routes', {templateUrl: 'templates/routes.html', controller: RoutesCtrl}).
                when('/routes/new', {templateUrl: 'templates/newroute.html', controller: RoutesCtrl}).
                when('/rides', {templateUrl: 'templates/rides.html', controller: RidesCtrl}).
                when('/rides/new', {templateUrl: 'templates/newride.html', controller: RidesCtrl}).
                when('/requests/:rideId', {templateUrl: 'templates/requests.html', controller: RequestsCtrl}).
                when('/ride/', {templateUrl: 'templates/ride.html', controller: RideCtrl}).
                when('/config', {templateUrl: 'templates/config.html'}).
                when('/config/profile', {templateUrl: 'templates/profile.html'}).
                when('/privacy', {templateUrl: 'templates/privacy.html'}).
                otherwise({redirectTo: '/'});
//        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);
