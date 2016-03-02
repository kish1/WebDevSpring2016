/**
 * Created by kishore on 3/1/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController ($scope, $location, $rootScope) {
        $scope.location = $location;
        $scope.registerHref = ($location.path() === "/register") ? "" : "#/register";
        $scope.loginHref = ($location.path() === "/login") ? "" : "#/login";


        $scope.isLoggedIn = isLoggedIn;
        $scope.isAdmin = isAdmin;
        $scope.loginClicked = loginClicked;
        $scope.registerClicked = registerClicked;


        function isLoggedIn() {
            return $rootScope.currentUser != null;
        }

        function isAdmin() {
            if ($rootScope.currentUser) {
                return ($rootScope.currentUser.roles.indexOf("admin") > -1);
            }
            return false;
        }

        function loginClicked() {

        }

        function registerClicked() {

        }
    }
})();
