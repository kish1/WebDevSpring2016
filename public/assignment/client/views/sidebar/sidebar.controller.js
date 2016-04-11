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
        vm.logout = logout;

        var init = function () {
            vm.location = $location;
        };
        init();

        function logout() {
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
