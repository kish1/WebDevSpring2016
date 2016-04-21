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
        vm.unfollow = unfollow;

        function init() {
            vm.pageOwnerHandle = $routeParams.userHandle;
            UserService
                .findUserByHandle(vm.pageOwnerHandle)
                .then(function (resp) {
                    vm.pageOwner = resp.data;
                    vm.dp = imageUrl(vm.pageOwner.displayPicture);
                    //console.log(vm.dp);
                    //console.log(vm.pageOwner);
                    console.log("atleast");

                    UserService
                        .getCurrentUser()
                        .then(function (resp) {
                            console.log(resp);
                            vm.currentUser = resp.data;
                            //console.log("here");
                            if (vm.currentUser != '0') {
                                if (vm.currentUser.handle == vm.pageOwnerHandle) {
                                    vm.isHomePage = true;
                                } else {
                                    console.log("too");
                                    FollowService
                                        .checkFollows(vm.currentUser._id, vm.pageOwner._id)
                                        .then(function (resp) {
                                            console.log(resp);
                                            if (resp.data) {
                                                vm.isFollowing = true;
                                            }
                                        });
                                }
                            }
                        });
                });
        }
        init();

        function follow() {
            FollowService
                .createFollowing(vm.currentUser._id, vm.pageOwner._id)
                .then(
                    function (resp) {
                        console.log(resp);
                        vm.isFollowing = true;
                    },
                    function (err) {

                    });
        }

        function unfollow() {
            FollowService
                .deleteFollowing(vm.currentUser._id, vm.pageOwner._id)
                .then(
                    function (resp) {
                        console.log(resp);
                        vm.isFollowing = false;
                    },
                    function (err) {

                    });
        }

        function imageUrl(imageName) {
            return "http://" + location.host + "/project/server/images/dp/" + imageName;
        }
    }

})();
