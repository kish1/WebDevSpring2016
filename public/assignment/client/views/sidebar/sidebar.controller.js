/**
 * Created by kishore on 3/1/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location, $rootScope) {
        $scope.$location = $location;
        $scope.isLoggedIn = isLoggedIn;
        $scope.isAdmin = isAdmin;

        function isLoggedIn() {
            return $rootScope.currentUser != null;
        }

        function isAdmin() {
            if ($rootScope.currentUser) {
                return ($rootScope.currentUser.roles.indexOf("admin") > -1);
            }
            return false;
        }

    }
})();
