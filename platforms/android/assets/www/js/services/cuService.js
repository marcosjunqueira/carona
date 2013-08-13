/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';
angular.module('caronaServices', []).factory('cuService', ['$rootScope', '$window', '$http', function($rootScope, $window, $http) {
        return {
            ridedates: function(from, to, callback) {
                var base = '../';
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
                var base = '../';
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
