'use strict';

/* Controllers */
function SearchCtrl($scope, $routeParams, $location, $resource, $http) {
    var Route = $resource('api/route/:fromId/:toId', {fromId: '@from', toId: '@to'}, {
        get: {method: 'GET', isArray: true}
    });
    var RideOffer = $resource('api/rideoffer/:fromId/:toId', {fromId: '@from', toId: '@to'}, {
        get: {method: 'GET', isArray: true}
    });
    $scope.name = "SearchCtrl";
    $scope.params = $routeParams;
    $scope.from = {id: $routeParams.fromId, label: $routeParams.fromLabel};
    $scope.to = {id: $routeParams.toId, label: $routeParams.toLabel};
    $scope.routes = [];
    $scope.rideoffers = [];
    $scope.ridesMap = {};

    $scope.initFrom = function() {
        if (!($scope.from.id && $scope.from.label)) {
            $scope.from = null;
        }
    };
    $scope.initTo = function() {
        if (!($scope.to.id && $scope.to.label)) {
            $scope.to = null;
        }
    };
    $scope.detectCityFrom = function() {
        $scope.from = $scope.city;
    };
    $scope.detectCityTo = function() {
        $scope.to = $scope.city;
    };
    $scope.search = function() {
        $scope.routes = Route.get({fromId: $scope.from.id, toId: $scope.to.id});
        $scope.rideoffers = RideOffer.get({fromId: $scope.from.id, toId: $scope.to.id});
    };
    $scope.initRoutes = function() {
        $scope.routes = Route.get($routeParams);
    };
    $scope.initRides = function() {
        $scope.ridesMap = RideOffer.get($routeParams, function() {
            alert('ok');
        });
    };

}