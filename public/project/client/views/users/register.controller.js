/**
 * Created by kishore on 3/23/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.message = null;
        vm.register = register;

        var init = function() {
            UserService
                .getCurrentUser()
                .then(function (resp) {
                    vm.currentUser = resp.data;
                    if (vm.currentUser != '0') {
                        $location.path('/profile');
                    }
                });
        };
        init();

        function register(user) {
            vm.message = null;
            if (user == null) {
                vm.message = "Please fill in the fields";
                return;
            }
            if (!user.handle) {
                vm.message = "Please enter a handle";
                return;
            }
            if (!user.password || !user.verify) {
                vm.message = "Please enter a password";
                return;
            }
            if (user.password !== user.verify) {
                vm.message = "The passwords do not match";
                return;
            }

            UserService.
                findUserByHandle(user.handle)
                .then(function(response) {
                    if (response.data) {
                        vm.message = "'" + user.handle + "'" + " is already in use. Choose a different handle.";
                    } else {
                        UserService.
                            register(user)
                            .then(function(response) {
                                UserService.setCurrentUser(response.data);
                                $location.url("/profile");
                            })
                    }
                });
        }
    }
})();

