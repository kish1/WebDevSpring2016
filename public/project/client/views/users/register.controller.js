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
            if (isLoggedIn()) {
                $location.url("/profile");
                return;
            }
        };
        init();

        function register(user) {
            vm.message = null;
            if (user == null) {
                vm.message = "Please fill in the fields";
                return;
            }
            if (!user.username) {
                vm.message = "Please enter a username";
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
            if (!user.question) {
                vm.message = "Please enter a secret question";
                return;
            }
            if (!user.answer) {
                vm.message = "Please enter an answer to your question";
                return;
            }

            UserService.
                findUserByCredentials(user.username, user.password)
                .then(function(response) {
                    console.log(response);
                    if (response.data) {
                        vm.message = "User already exists";
                    } else {
                        UserService.
                            createUser(user)
                            .then(function(response) {
                                UserService.setCurrentUser(response.data);
                                $location.url("/profile");
                            })
                    }
                });
        }

        function isLoggedIn() {
            return UserService.getCurrentUser() != null;
        }
    }
})();
