'use strict';

/* Controllers */

function ProfileCtrl($scope, $routeParams, userService) {
    $scope.name = "ProfileCtrl";
    $scope.params = $routeParams;
    $scope.user = {};
    $scope.currentUser = {};
    $scope.loadUser = function() {
        userService.findUserById($routeParams.userId, function(response) {
            $scope.user = response;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
        userService.currentUser(function(response) {
            $scope.currentUser = response;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    };

}