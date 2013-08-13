/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
angular.module('infoServices', []).factory('infoService', ['$rootScope', '$window', '$http', function($rootScope, $window, $http) {
        return {
            loadCityInfo: function(city, callback) {
                var base = '';
                var url = 'info/city/';
                if (city == null) {
                    $http.get(base + url).success(function(cityInfo) {
                        callback(cityInfo); // This will automatically open the popup with retrieved results
                    });
                } else {
                    $http.get(base + url + city.id).success(function(cityInfo) {
                        callback(cityInfo); // This will automatically open the popup with retrieved results
                    });
                }
            },
            loadUsersInfo: function(callback) {
                var base = '';
                var url = 'info/users';
                $http.get(base + url).success(function(usersInfo) {
                    callback(usersInfo); // This will automatically open the popup with retrieved results
                });
            },
            ridedates: function(from, to, callback) {
                var base = '';
                var url = 'ridedates/';
                $http.get(base + url + from + '/' + to).
                        success(function(data, status, headers, config) {
                    callback(data);
                }).
                        error(function(data, status, headers, config) {
                    alert("Error:" + status + "--" + data + "--" + headers + "-" + config);
                });
            },
            offerRide: function(offerRide, callback) {
                var base = '';
                var url = 'offer/ride';
                $http.post(base + url, offerRide).
                        success(function(data, status, headers, config) {
                    callback(data);
                }).
                        error(function(data, status, headers, config) {
                    alert("Error:" + status + "--" + data + "--" + headers + "-" + config);
                });
            }
        };
    }]);
