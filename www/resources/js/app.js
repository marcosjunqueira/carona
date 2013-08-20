'use strict';

/* App Module */

var carona = angular.module('carona', ['ngResource', 'datetime', 'ui.bootstrap', 'geoServices', '$strap.directives']).
        config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
                when('/', {templateUrl: 'resources/templates/index.html'}).
                when('/search', {templateUrl: 'resources/templates/search.html', controller: SearchCtrl}).
                when('/search/:fromId/:toId', {templateUrl: 'resources/templates/search_1.html', controller: SearchCtrl}).
                when('/search/:fromId/:toId/:year/:month/:day', {templateUrl: 'resources/templates/search_2.html', controller: SearchCtrl}).
                when('/routes', {templateUrl: 'resources/templates/routes.html', controller: RoutesCtrl}).
                when('/routes/new', {templateUrl: 'resources/templates/newroute.html', controller: RoutesCtrl}).
                when('/rides', {templateUrl: 'resources/templates/rides.html', controller: RidesCtrl}).
                when('/rides/new', {templateUrl: 'resources/templates/newride.html', controller: RidesCtrl}).
                when('/requests/:rideId', {templateUrl: 'resources/templates/requests.html', controller: RequestsCtrl}).
                when('/ride/', {templateUrl: 'resources/templates/ride.html', controller: RideCtrl}).
                when('/config', {templateUrl: 'resources/templates/config.html'}).
                when('/config/profile', {templateUrl: 'resources/templates/profile.html'}).
                when('/privacy', {templateUrl: 'resources/templates/privacy.html'}).
                otherwise({redirectTo: '/'});
//        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);
