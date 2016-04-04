/**
 * Created by kishore on 3/1/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($location, UserService) {
        var vm = this;
        vm.currentUser = null;

        vm.$location = $location;
        vm.isLoggedIn = isLoggedIn;
        vm.isAdmin = isAdmin;

        var init = function () {
            checkLoggedIn();
        };
        init();

        function checkLoggedIn() {
            UserService.getLoggedIn()
                .then(function (resp) {
                UserService.setCurrentUser(resp.data);
                vm.currentUser = resp.data;
                return resp.data != "";
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

    }
})();
