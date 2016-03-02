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
            if (validUser == null) {
                //console.log("Null");
                $scope.message = "Invalid credentials"
            }
            else {
               // console.log("valid");
                //console.log(validUser);
                $rootScope.currentUser = validUser;
                $location.url('/profile');
            }
            function identity(param) {
                return param;
            }
        }
    }
})();
