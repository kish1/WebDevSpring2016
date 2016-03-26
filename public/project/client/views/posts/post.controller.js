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

        var init = function() {
            vm.currentUser = UserService.getCurrentUser();
            if (!vm.currentUser) {
                $location.url("/login");
                return;
            }
            PostService.findAllPostsForUser(vm.currentUser._id)
                .then(function(response) {
                    vm.myposts = response.data;
                });
        };
        init();

        function readPost(postId) {
            $location.search("postId", postId).path("/readpost");
        }
    }
})();
