/**
 * Created by kishore on 3/10/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService, $location, $rootScope) {
        //console.log("Header Loaded");
        var vm = this;
        vm.isLoggedIn = isLoggedIn;
        vm.signOut = signOut;
        vm.goHome = goHome;
        vm.currentUser = null;


        var init = function() {
            vm.$location = $location;
        };
        init();

        function goHome() {
            if ($rootScope.currentUser) {
                $location.path('/user/' + $rootScope.currentUser.handle);
            } else {
                $location.path('/home');
            }
        }


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
