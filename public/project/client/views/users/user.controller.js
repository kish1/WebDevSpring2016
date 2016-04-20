/**
 * Created by kishore on 4/3/16.
 */
(function() {
    angular
        .module("BlogApp")
        .controller("UserController", UserController);
    function UserController(UserService, FollowService, $routeParams) {
        var vm = this;
        vm.userHandle = $routeParams.userHandle;
        vm.pageOwner = null;
        vm.currentUser = null;
        vm.isHomePage = false;
        vm.isFollowing = false;
        vm.dp = "/project/images/default.jpg";

        function init() {
            if (UserService.getCurrentUser()) {
                vm.currentUser = UserService.getCurrentUser();

                if (vm.currentUser.displayPicture) {
                    vm.dp = imageUrl(vm.currentUser.displayPicture);
                }

                if (vm.currentUser.handle == vm.userHandle) {
                    vm.isHomePage = true;
                } else {

                    FollowService
                        .checkFollows()
                }
            }
        }
        init();

        function imageUrl(imageName) {
            return "http://" +  location.host +  "/project/server/images/dp/" + imageName;
        }

    }
})();
