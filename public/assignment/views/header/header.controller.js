/**
 * Created by kishore on 3/1/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController ($scope, $location) {
        $scope.location = $location;

        $scope.isLoggedIn = isLoggedIn();


        function isLoggedIn() {
            var path = $location.path();
            return path === '/home' || path === '/login'|| path === '/register';
        }
    }
})();
