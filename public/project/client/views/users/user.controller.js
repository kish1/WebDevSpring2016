/**
 * Created by kishore on 4/3/16.
 */
(function() {
    angular
        .module("BlogApp")
        .controller("UserController", UserController);
    function UserController(UserService, FollowService, $routeParams) {
        var vm = this;
        vm.ownerHandle = $routeParams.userHandle;
        vm.pageOwner = null;
        vm.currentUser = null;
        vm.isHomePage = false;
        vm.isFollowing = false;
        vm.dp = "/project/images/default.jpg";

        vm.follow = follow;

        function init() {
            //console.log(vm.ownerHandle);
            if (UserService.getCurrentUser()) {
                UserService
                    .findUserById(UserService.getCurrentUser()._id)
                    .then(function (resp) {
                        //console.log(resp);
                        vm.currentUser = resp.data;

                        if (vm.currentUser.handle == vm.ownerHandle) {
                            vm.isHomePage = true;
                            vm.dp = imageUrl(vm.currentUser.displayPicture);
                        } else {
                            UserService
                                .findUserByHandle(vm.ownerHandle)
                                .then(function (resp) {
                                    vm.pageOwner = resp.data;
                                    vm.dp = imageUrl(vm.pageOwner.displayPicture);
                                    //console.log(vm.pageOwner);
                                    FollowService
                                        .checkFollows(vm.currentUser._id, vm.pageOwner._id)
                                        .then(function(resp) {
                                            //console.log(resp);
                                        });
                                });

                        }

                    });
            } else {
                UserService
                    .findUserByHandle(vm.ownerHandle)
                    .then(function (resp) {
                        vm.pageOwner = resp.data;
                        vm.dp = imageUrl(vm.pageOwner.displayPicture);
                        //console.log(vm.pageOwner);
                    });
            }
        }
        init();

        function follow() {

        }

        function imageUrl(imageName) {
            return "http://" +  location.host +  "/project/server/images/dp/" + imageName;
        }

    }
})();
