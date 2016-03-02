/**
 * Created by kishore on 3/1/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $rootScope, $location) {
        $scope.message = null;
        $scope.error = null;
        $scope.currentUser = $rootScope.currentUser;
        $scope.details = {
            username : $scope.currentUser.username,
            password : $scope.currentUser.password,
            firstName : $scope.currentUser.firstName,
            lastName : $scope.currentUser.lastName
        }
        $scope.update = update;

        //console.log($scope.currentUser);
        if (!$scope.currentUser) {
            $location.url('/home');
        }

        function update(details) {
            if (details) {
                //console.log(details);
                UserService.updateUser($scope.currentUser._id, details, identity);
                $scope.message = "User details updated successfully";
                //console.log($scope.currentUser);
            } else {
                $scope.error = "Unable to update user details";
            }

            function identity(param) {
                return param;
            }
        }
    }
})();