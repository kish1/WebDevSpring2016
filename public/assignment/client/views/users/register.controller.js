/**
 * Created by kishore on 3/1/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService, $rootScope) {
        $scope.message = null;
        $scope.register = register;

        function register(user) {
            $scope.message = null;
            if (user == null) {
                $scope.message = "Please fill in the fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please enter a username";
                return;
            }
            if (!user.password || !user.verify) {
                $scope.message = "Please enter a password";
                return;
            }
            if (user.password !== user.verify) {
                $scope.message = "The passwords do not match";
                return;
            }
            var existing = UserService.findUserByCredentials(user.username, user.password, identity);
            if (existing !== null) {
                $scope.message = "User already exists";
                return;
            }
            var newUser = UserService.createUser(user,identity);
            $rootScope.currentUser = newUser;
            $location.url("/profile");

            function identity (param) {
                return param;
            }
        }
    }
})();
