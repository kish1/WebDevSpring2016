/**
 * Created by kishore on 4/3/16.
 */
(function() {
    angular
        .module("BlogApp")
        .controller("UserController", UserController);
    function UserController(UserService, FollowService, $routeParams) {
        var vm = this;
        vm.pageOwnerHandle = null;
        vm.pageOwner = null;
        vm.currentUser = null;
        vm.isHomePage = false;
        vm.isFollowing = false;
        vm.dp = "/project/images/default.jpg";

        vm.follow = follow;

        function init() {
            vm.pageOwnerHandle = $routeParams.userHandle;
            UserService
                .findUserByHandle(vm.pageOwnerHandle)
                .then(function (resp) {
                    vm.pageOwner = resp.data;
                    vm.dp = imageUrl(vm.pageOwner.displayPicture);
                    //console.log(vm.dp);
                    //console.log(vm.pageOwner);

                    UserService
                        .findUserById(UserService.getCurrentUser()._id)
                        .then(function (resp) {
                            //console.log(resp);
                            vm.currentUser = resp.data;
                            if (vm.currentUser) {
                                if (vm.currentUser.handle == vm.pageOwnerHandle) {
                                    vm.isHomePage = true;
                                } else {
                                    FollowService
                                        .checkFollows(vm.currentUser._id, vm.pageOwner._id)
                                        .then(function(resp) {
                                            console.log(resp);
                                        });
                                }
                            }


                        });

                });

        }
        init();

        function follow() {

        }

        function imageUrl(imageName) {
            return "http://" +  location.host +  "/project/server/images/dp/" + imageName;
        }

    }
})();
