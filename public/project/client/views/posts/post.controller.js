/**
 * Created by kishore on 3/25/16.
 */
"use strict";
(function() {
    angular
        .module("BlogApp")
        .controller("PostController", PostController);

    function PostController(UserService, PostService, $location) {
        var vm = this;
        vm.currentUser = null;
        vm.myposts = null;

        vm.readPost = readPost;
        vm.deletePost = deletePost;

        var init = function() {
            UserService
                .getCurrentUser()
                .then(function (resp) {
                    vm.currentUser = resp.data;
                    PostService.findAllPostsForUser(vm.currentUser._id)
                        .then(function(response) {
                            vm.myposts = response.data;
                        });
                });

        };
        init();

        function deletePost(postId, $index) {
            PostService
                .deletePostById(postId)
                .then(function (resp) {
                    vm.myposts.splice($index, 1);
                });
        }

        function readPost(postId) {
            $location.search("postId", postId).path("/readpost");
        }
    }
})();
