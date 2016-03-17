/**
 * Created by kishore on 3/1/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $rootScope, $location) {
        if (!$rootScope.currentUser) {
            $location.url('/home');
            return;
        }
    }
})();
