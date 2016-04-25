/**
 * Created by kishore on 3/25/16.
 */
"use strict";
(function() {
    angular
        .module("BlogApp")
        .controller("PostController", PostController);

    function PostController(UserService, PostService, $location, $routeParams) {
        var vm = this;
        vm.currentUser = null;
        vm.posts = null;
        vm.pageOwnerHandle = null;
        vm.pageOwner = null;
        vm.isOwnPage = false;

        vm.readPost = readPost;
        vm.deletePost = deletePost;

        var init = function() {
            vm.pageOwnerHandle = $routeParams.userHandle;
            UserService
                .findUserByHandle(vm.pageOwnerHandle)
                .then(function (resp) {
                    if (!resp.data) {
                        $location.path("/notfound");
                        return;
                    }
                    vm.pageOwner = resp.data;
                    console.log(vm.pageOwner);
                    PostService.findAllPostsForUser(vm.pageOwner._id)
                        .then(function(response) {
                            //console.log(response);
                            vm.posts = response.data;
                        });
                    UserService
                        .getCurrentUser()
                        .then(function(resp) {
                            vm.currentUser = resp.data;
                            if (vm.currentUser && (vm.currentUser._id == vm.pageOwner._id)) {
                                vm.isOwnPage = true;
                            }
                        });
                });
        };
        init();

        function deletePost(postId, $index) {
            PostService
                .deletePostById(postId)
                .then(function (resp) {
                    vm.posts.splice($index, 1);
                });
        }

        function readPost(postId) {
            $location.search("postId", postId).path("/readpost");
        }
    }
})();
