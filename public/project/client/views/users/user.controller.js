/**
 * Created by kishore on 4/3/16.
 */
(function() {
    angular
        .module("BlogApp")
        .controller("UserController", UserController);
    function UserController(UserService, $routeParams) {
        var vm = this;
        vm.userId = $routeParams.userId;

    }
})();
