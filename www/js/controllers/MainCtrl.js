'use strict';

/* Controllers */

function MainCntl($scope, $route, $routeParams, $location, $resource, $http, geoService) {
    var City = $resource('api/city/:cityId/:term', {cityId: '@id', term: '@label'}, {
        geoloc: {method: 'POST', params: {cityId: 'geoloc'}},
    });
    var User = $resource('api/user/:userId', {userId: '@id'}, {
        count: {method: 'GET', params: {userId: 'count'}},
        me: {method: 'GET', params: {userId: 'me'}},
        updateMe: {method: 'POST', params: {userId: 'me'}}
    });
    var Group = $resource('api/group/:groupId', {groupId: '@id'}, {
        my: {method: 'GET', isArray: true, params: {groupId: "my"}},
        update: {method: 'GET', params: {groupId: "update"}}
    });
    var Info = $resource('api/info', {});
    var CityInfo = $resource('api/info/city/:cityId', {cityId: '@id'});
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    $scope.position = {};
    $scope.city = {};
    $scope.user = {};
    $scope.info = {};
    $scope.cityInfo = {};
    $scope.fb = {};
    $scope.myGroups = [];

    $scope.isActive = function(route) {
        return route === $location.path();
    };

    $scope.detectGeoPosition = function() {
//        geoService.getCurrentPosition(function(position) {
//            alert('Latitude: ' + position.coords.latitude + '\n' +
//                    'Longitude: ' + position.coords.longitude + '\n' +
//                    'Altitude: ' + position.coords.altitude + '\n' +
//                    'Accuracy: ' + position.coords.accuracy + '\n' +
//                    'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
//                    'Heading: ' + position.coords.heading + '\n' +
//                    'Speed: ' + position.coords.speed + '\n' +
//                    'Timestamp: ' + position.timestamp + '\n');
//        });
        geoService.detectGeoPosition(function(geoposition) {
            $scope.position = geoposition;
            $scope.detectCity();
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    };
    $scope.detectCity = function() {
        $scope.city = City.geoloc($scope.position, function() {
            $scope.loadCityInfo($scope.city.id);
        });
    };
    $scope.findFromCity = function() {
        $location.search({fromId: $scope.city.id, fromLabel: $scope.city.label}).path('/search');
    };
    $scope.moreRide = function(ride) {
        $location.search(ride).path('/ride');
    };
    $scope.currentUser = function() {
        $scope.user = User.me();
    };
    $scope.updateMe = function() {
        $scope.user = User.updateMe($scope.user);
    };
    $scope.loadCityInfo = function(cityId) {
        $scope.info = Info.get();
        $scope.cityInfo = CityInfo.get({cityId: cityId});
        //TODO refazer serviço
//        infoService.loadCityInfo($scope.city, function(cityInfo) {
//            $scope.cityInfo = cityInfo;
//            if (!$scope.$$phase) {
//                $scope.$apply();
//            }
//        });
    };
    $scope.cityTypeaheadFn = function(cityName) {
        return $http.get("api/city/query/" + cityName).then(function(response) {
            return response.data;
        });
    };

    $scope.loadUsersInfo = function() {
//        infoService.loadUsersInfo(function(usersInfo) {
//            $scope.usersInfo = usersInfo;
//            $scope.loadCityInfo();
//            if (!$scope.$$phase) {
//                $scope.$apply();
//            }
//        });
    };
    $scope.loadMyGroups = function() {
        $scope.myGroups = Group.my();
    };
    $scope.updateMyGroups = function() {
        Group.update();
        $scope.loadMyGroups();
    };
}