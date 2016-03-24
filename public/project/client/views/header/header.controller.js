/**
 * Created by kishore on 3/10/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService, $location) {
        //console.log("Header Loaded");
        var vm = this;
        vm.isLoggedIn = isLoggedIn;
        vm.signOut = signOut;
        vm.currentUser = null;
        vm.$location = $location;

        var init = function() {
            vm.currentUser = UserService.getCurrentUser();
        };
        init();


        function isLoggedIn() {
            vm.currentUser = UserService.getCurrentUser();
            return vm.currentUser != null;
        }

        function signOut() {
            console.log("sign out");
            vm.currentUser = null;
            UserService.setCurrentUser(null);
            $location.url("/home");
        }
    }


})();
