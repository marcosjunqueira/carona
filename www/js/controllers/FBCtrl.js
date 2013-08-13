'use strict';

/* Controllers */

function FBCtrl($scope, facebook) {
    $scope.login = {};
    $scope.me = {};
    $scope.oglikes = null;
    $scope.opts = {scope: 'email,user_likes,publish_actions'};
    $scope.findMe = function() {
        facebook.me(function(response) {
            $scope.me = response;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    };
    $scope.findLikes = function() {
        facebook.apiRead('me/og.likes', function(response) {
            $scope.oglikes = response;
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
        }, $scope.opts);
    };
    $scope.send = function() {
        facebook.ui({method: 'send', name: 'Carona Universitária', link: 'https://apps.facebook.com/caronabrasil/', caption: 'Carona Universitária', description: 'descrição'}, function(response) {
            if (response.success) {
                alert('Post was published.');
            } else {
                alert('Post was not published.');
            }
        });
    };

}