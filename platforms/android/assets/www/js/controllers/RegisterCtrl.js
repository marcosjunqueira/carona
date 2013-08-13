'use strict';

/* Controllers */

function FBCtrl($scope, userService) {
    $scope.user = {};
    $scope.register = function() {
        userService.register($scope.user, function(response) {
            $scope.user = response;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    };
}