/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
angular.module('geoServices', []).factory('geoService', ['$window', function($window) {
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
        };
    }]);
