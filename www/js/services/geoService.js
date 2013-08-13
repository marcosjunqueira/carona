/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
angular.module('geoServices', [])
        .factory('geoService', ['$rootScope', '$window', function($rootScope, $window) {
        return {
            detectGeoPosition: function(callback) {
                $window.navigator.geolocation.getCurrentPosition(function(position) {
                    var geoposition = {
                        timestamp: position.timestamp,
                        coords: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            altitude: position.coords.altitude,
                            accuracy: position.coords.accuracy,
                            altitudeAccuracy: position.coords.altitudeAccuracy,
                            heading: position.coords.heading,
                            speed: position.coords.speed
                        }
                    };
                    callback(geoposition);
                });
            },
//            getCurrentPosition: function(onSuccess, onError, options) {
//                navigator.geolocation.getCurrentPosition(function() {
//                    var that = this,
//                            args = arguments;
//
//                    if (onSuccess) {
//                        $rootScope.$apply(function() {
//                            onSuccess.apply(that, args);
//                        });
//                    }
//                }, function() {
//                    var that = this,
//                            args = arguments;
//
//                    if (onError) {
//                        $rootScope.$apply(function() {
//                            onError.apply(that, args);
//                        });
//                    }
//                },
//                        options);
//            }
        };
    }]);