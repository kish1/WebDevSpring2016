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

        function login(user) {
            vm.message = null;
            if (!user) {
                vm.message = "Invalid credentials"
            }
            UserService
                .login({
                    handle: user.handle,
                    password: user.password
                })
                .then(function(response) {
                    if (response.data) {
                        UserService.setCurrentUser(response.data);
                        //console.log(response);
                        $location.url('/profile');
                    } else {
                        vm.message = "User not found";

                    }
                });
        }

    }
})();

