/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
angular.module('userServices', []).factory('userService', ['$rootScope', '$http', function($rootScope, $http) {
        return {
            currentUser: function(callback) {
                var base = '';
                var url = 'api/currentUser';
                $http.get(base + url).
                        success(function(data, status, headers, config) {
                    callback(data);
                }).
                        error(function(data, status, headers, config) {
                    alert("Error:" + status + "--" + data + "--" + headers + "-" + config);
                });
            },
            findUserById: function(userId, callback) {
                var base = '';
                var url = 'api/users/' + userId;
                $http.get(base + url).
                        success(function(data, status, headers, config) {
                    callback(data);
                }).
                        error(function(data, status, headers, config) {
                    alert("Error:" + status + "--" + data + "--" + headers + "-" + config);
                });
            }
        };
    }]);

