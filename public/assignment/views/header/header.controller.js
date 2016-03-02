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

        $scope.isLoggedIn = isLoggedIn;
        $scope.isAdmin = isAdmin;
        $scope.logout = logout;

        $scope.loginClicked = loginClicked;
        $scope.registerClicked = registerClicked;
        $scope.$rootScope = $rootScope;


        function isLoggedIn() {
            return $rootScope.currentUser != null;
        }

        function isAdmin() {
            if ($rootScope.currentUser) {
                return ($rootScope.currentUser.roles.indexOf("admin") > -1);
            }
            return false;
        }

        function logout() {
            $rootScope.currentUser = null;
            $location.url('/home');
        }

        function loginClicked() {

        }

        function registerClicked() {

        }
    }
})();
