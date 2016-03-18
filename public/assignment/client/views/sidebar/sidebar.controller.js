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

        vm.$location = $location;
        vm.isLoggedIn = isLoggedIn;
        vm.isAdmin = isAdmin;

        function isLoggedIn() {
            vm.currentUser = UserService.getCurrentUser();
            return vm.currentUser != null;
        }

        function isAdmin() {
            if (vm.currentUser && vm.currentUser.roles) {
                return (vm.currentUser.roles.indexOf("admin") > -1);
            }
            return false;
        }

    }
})();
