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

        vm.isLoggedIn = isLoggedIn;
        vm.isAdmin = isAdmin;
        vm.logout = logout;


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

        function logout() {
            vm.currentUser = null;
            UserService.setCurrentUser(null);
            $location.url('/home');
        }
    }
})();
