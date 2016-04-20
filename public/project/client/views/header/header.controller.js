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


        var init = function() {
            vm.$location = $location;
        };
        init();


        function isLoggedIn() {
            vm.currentUser = UserService.getCurrentUser();
            return vm.currentUser != null;
        }

        function signOut() {
            vm.currentUser = null;
            UserService.logout()
                .then(function (res) {
                        UserService.setCurrentUser(null);
                        $location.url('/login');
                    },
                    function (err) {
                        vm.error = err;
                    });
        }
    }


})();
