/**
 * Created by kishore on 3/23/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .controller("LoginController", LoginController);

    function LoginController ($location, UserService) {
        var vm = this;

        vm.message = null;
        vm.login = login;

        var init = function() {
            if (isLoggedIn()) {
                $location.url("/profile");
                return;
            }
        };
        init();

        function login(user) {
            vm.message = null;
            if (!user) {
                vm.message = "Invalid credentials"
            }
            UserService
                .findUserByCredentials(user.handle, user.password)
                .then(function(response) {
                    if (response.data) {

                        UserService.setCurrentUser(response.data);
                        $location.url('/profile');
                    } else {
                        vm.message = "User not found";

                    }
                });
        }

        function isLoggedIn() {
            return UserService.getCurrentUser() != null;
        }
    }
})();

