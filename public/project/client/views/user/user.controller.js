/**
 * Created by kishore on 3/10/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .controller("UserController", UserController);

    function UserController($scope, $location) {
        $scope.$location = $location;

    }
})();