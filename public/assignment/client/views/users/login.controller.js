/**
 * Created by kishore on 3/1/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController ($scope, $location, UserService, $rootScope) {
        $scope.message = null;
        $scope.login = login;

        function login(user) {
            $scope.message = null;
            var validUser = UserService.findUserByCredentials(user.username, user.password, identity);
            if (!validUser) {
                $scope.message = "Invalid credentials"
            }
            else {
                $rootScope.currentUser = validUser;
                $location.url('/profile');
            }
            function identity(param) {
                return param;
            }
        }
    }
})();
