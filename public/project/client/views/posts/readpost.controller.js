/**
 * Created by kishore on 3/25/16.
 */
"use strict";
(function() {
    angular
        .module("BlogApp")
        .controller("ReadpostController", ReadpostController);

    function ReadpostController($location, PostService) {
        var vm = this;

        vm.postId = null;
        vm.post = null;

        var init = function() {
            vm.postId = $location.search().postId;
            //console.log(vm.postId);
            PostService.findPostById(vm.postId)
                .then(function(response) {
                    console.log(response);
                    vm.post = response.data;
                    vm.post.createdOn = new Date(vm.post.createdOn[0], vm.post.createdOn[1], vm.post.createdOn[2]);
                });
        };
        init();
    }
})();
