'use strict';

/* Controllers */

function CoordsCtrl($scope, geoService, userService, facebook, $http) {
    $scope.cityLabels = [];
    $scope.cityMapped = {};
    $scope.user = null;
    $scope.position = null;
    $scope.city = null;
    $scope.cityInfo = null;
    $scope.usersInfo = null;
    $scope.dates = [];
    $scope.result = null;
    $scope.login = null;
    $scope.detectGeoPosition = function() {
        geoService.detectGeoPosition(function(geoposition) {
            $scope.position = geoposition;
            $scope.detectCity();
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    };
    $scope.detectCity = function() {
        geoService.findCityByPosition($scope.position, function(city) {
            $scope.city = city;
            $scope.loadCityInfo();
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    };
    $scope.loadCityInfo = function() {
        geoService.loadCityInfo($scope.city, function(cityInfo) {
            $scope.cityInfo = cityInfo;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    };

    $scope.loadUsersInfo = function() {
        geoService.loadUsersInfo(function(usersInfo) {
            $scope.usersInfo = usersInfo;
            $scope.loadCityInfo();
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    };

    $scope.currentUser = function() {
        userService.currentUser(function(user) {
            $scope.user = user;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    };

    $scope.typeaheadFn = function(query, callback) {
        geoService.getCitiesByName(query, callback);
    };

    $scope.ridedates = function() {
        geoService.ridedates('uberlandia-mg', 'boa-esperanca-mg', function(data) {
            $scope.dates = data;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    };

    $scope.offerRideCB = function() {
        facebook.offerRide(function(data) {
            $scope.result = data;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    };
    $scope.login = function() {
        facebook.login(function(data) {
            $scope.login = data;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    };

}

function TripCtrl($scope) {
    $scope.trip = {};
}

function OfferRidesCtrl($scope, cuService, geoService, infoService, userService, facebook, $http) {
    $scope.ride = {
        to: [{}]
    };
    $scope.mapLink;
    $scope.mapImage = "http://maps.googleapis.com/maps/api/staticmap?zoom=7&size=300x300&maptype=roadmap&sensor=false";

    $scope.addTo = function() {
        $scope.ride.to.push({});
    };
    $scope.removeTo = function() {
        $scope.ride.to.pop({});
    };

    $scope.offerRide = function() {
        cuService.offerRide($scope.ride, function(data) {
            $scope.mapLink = data.googleMapsLink;
            $scope.mapImage = data.googleMapsImage;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    };

}

function removeAcentos(query) {
    return query.toLowerCase().replace(/-/g, "").replace(/ +/g, "-").replace(/[ã,â,á,à]/g, "a").replace(/[ç]/g, "c").replace(/[é,ê]/g, "e").replace(/[í]/g, "i").replace(/[ó,ô,õ]/g, "o").replace(/[ú]/g, "u");
}

function TypeaheadCtrl($scope, $http) {

    $scope.selected = undefined;
    $scope.states = [{"id": "uberaba-mg", "name": "Uberaba", "state": "MG", "position": null, "label": "Uberaba - MG"}, {"id": "uberlandia-mg", "name": "Uberlândia", "state": "MG", "position": null, "label": "Uberlândia - MG"}];

    $scope.cities = function(cityName) {
        return $http.get("http://localhost:8080/caronauniversitaria/cities/" + cityName).then(function(response) {
            return response.data;
        });
    };
}