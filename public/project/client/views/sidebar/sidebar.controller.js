/**
 * Created by kishore on 3/10/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location) {
        $scope.$location = $location;
        //console.log($scope.$location.path());
    }
})();
