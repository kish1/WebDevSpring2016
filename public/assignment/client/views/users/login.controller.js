/**
 * Created by kishore on 3/1/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController ($location, UserService) {
        var vm = this;

        vm.message = null;

        vm.login = login;

        var init = function() {
        };
        init();

        function login(user) {
            console.log("reaches");
            vm.message = null;
            if (!user) {
                vm.message = "Invalid credentials"
            }
            UserService
                .login({
                    username: user.username,
                    password: user.password
                })
                .then(function(response) {
                    console.log("here");
                    if (response.data) {
                        UserService.setCurrentUser(response.data);
                        console.log(response);
                        $location.url('/profile');
                    } else {
                        vm.message = "User not found";

                    }
                });
        }


    }
})();
