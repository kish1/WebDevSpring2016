/**
 * Created by kishore on 3/24/16.
 */
(function () {
    angular
        .module("BlogApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location) {
        var vm = this;
        vm.currentUser = null;

        var init = function() {
            if (!UserService.getCurrentUser()) {
                $location.url("/login");
                return;
            } else {
                vm.currentUser = UserService.getCurrentUser();
            }
        };
        init();

    }
})();
