'use strict';

/* Controllers */

function RoutesCtrl($scope, $location, $routeParams, $resource) {
    var Route = $resource('api/route/:routeId', {routeId: '@id'}, {
        my: {method: 'GET', isArray: true, params: {routeId: "my"}}
    });
    $scope.myroutes = [];
    $scope.route = {cities: [], phones: [{}]};

    $scope.detectCityFrom = function() {
        $scope.route.from = $scope.city;
    };
    $scope.detectCityTo = function() {
        $scope.route.to = $scope.city;
    };
    $scope.addCity = function() {
        $scope.route.cities.push({});
    };
    $scope.removeCity = function() {
        $scope.route.cities.pop({});
    };
    $scope.addPhone = function() {
        $scope.route.phones.push({});
    };
    $scope.removePhone = function() {
        $scope.route.phones.pop({});
    };
    $scope.findMyRoutes = function() {
        $scope.myroutes = Route.my();
    };
    $scope.newRoute = function() {
        $location.path('/routes/new');
    };
    $scope.cancelNewRoute = function() {
        $location.path('/routes');
    };
    $scope.saveRoute = function() {
        Route.save($scope.route, function() {
            $scope.findMyRoutes();
            $location.path('/routes');
        });
    };
    $scope.removeRoute = function(r) {
        Route.delete({id: r.id}, function() {
            $scope.findMyRoutes();
        });
    };
    $scope.offerRide = function(r) {
        $location.search({ride: {route: r}}).path('/rides/new');
    };
}

function RidesCtrl($scope, $location, $routeParams, $resource) {

    var RideOffer = $resource('api/rideoffer/:rideId', {rideId: '@id'}, {
        my: {method: 'GET', isArray: true, params: {rideId: "my"}}
    });

    $scope.myrides = [];
    $scope.ride = $routeParams.ride;

    $scope.findMyRides = function() {
        $scope.myrides = RideOffer.my();
    };
    $scope.saveRideOffer = function() {
        var ride = {
            departure: $scope.ride.departure,
            regress: $scope.ride.regress,
            route: {
                id: $scope.ride.route.id
            }
        };
        RideOffer.save(ride);
        $location.path('/rides');
    };
    $scope.editRideOffer = function(ride) {
        $location.search({ride: ride}).path('/rides/new');
    };
    $scope.cancelRideOffer = function(ride) {
        RideOffer.remove(ride, function() {
            $scope.findMyRides();
        });
    };
    $scope.showRequests = function(ride) {
        $location.path('/requests/' + ride.id);
    }

}

function RequestsCtrl($scope, $location, $routeParams, $resource) {

    var RideOffer = $resource('api/rideoffer/:rideId/:action/:userId', {rideId: '@id', action: '@action', userId: '@userId'}, {
        my: {method: 'GET', isArray: true, params: {rideId: "my"}},
        request: {method: 'GET', params: {action: "request"}},
        requestFor: {method: 'GET', params: {action: "request"}},
        decline: {method: 'GET', params: {action: "decline"}},
        confirm: {method: 'GET', params: {action: "confirm"}},
        unconfirm: {method: 'GET', params: {action: "unconfirm"}}
    });

    $scope.rd;
    $scope.params = $routeParams;

    $scope.loadRide = function() {
        $scope.rd = RideOffer.get({rideId: $scope.params.rideId});
    };
    $scope.decline = function(rideId, userId) {
        $scope.rd = RideOffer.decline({rideId: rideId, userId: userId});
    };
    $scope.confirm = function(rideId, userId) {
        $scope.rd = RideOffer.confirm({rideId: rideId, userId: userId});
    };
    $scope.unconfirm = function(rideId, userId) {
        $scope.rd = RideOffer.unconfirm({rideId: rideId, userId: userId});
    };
}