/**
 * Created by kishore on 3/1/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController ($location, UserService) {
        var vm = this;
        vm.location = $location;
        vm.currentUser = null;

        vm.isLoggedIn = isLoggedIn;
        vm.isAdmin = isAdmin;
        vm.logout = logout;

        var init = function () {
            vm.currentUser = UserService.getCurrentUser();
            checkLoggedIn();
        };
        init();

        function checkLoggedIn() {
            UserService.getLoggedIn()
                .then(function (resp) {
                    UserService.setCurrentUser(resp.data);
                    vm.currentUser = UserService.getCurrentUser();
                    return resp.data != null;
            });
        }

        function isLoggedIn() {
            return UserService.getCurrentUser() != null;
        }

        function isAdmin() {
            if (vm.currentUser && vm.currentUser.roles) {
                return (vm.currentUser.roles.indexOf("admin") > -1);
            }
            return false;
        }

        function logout() {
            vm.currentUser = null;
            UserService.logout()
                .then(function (res) {
                    UserService.setCurrentUser(null);
                });
            $location.url('/home');
        }
    }
})();
