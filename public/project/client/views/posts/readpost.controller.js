/**
 * Created by kishore on 3/25/16.
 */
"use strict";
(function() {
    angular
        .module("BlogApp")
        .controller("ReadpostController", ReadpostController);

    function ReadpostController($location, PostService, UserService, CommentService) {
        var vm = this;

        vm.currentUser = null;
        vm.postId = null;
        vm.post = null;
        vm.comments = null;
        vm.comment = {};
        vm.message = null;

        vm.isOwnPost = isOwnPost;
        vm.addComment = addComment;
        vm.isOwnerOrCommenter = isOwnerOrCommenter;
        vm.removeComment = removeComment;

        var init = function() {
            vm.postId = $location.search().postId;

            vm.currentUser = UserService.getCurrentUser();

            if(!vm.currentUser) {
                $location.url("/login");
                return;
            }

            PostService.findPostById(vm.postId)
                .then(function(response) {
                    //console.log(response);
                    vm.post = response.data;
                    vm.post.createdOn = new Date(vm.post.createdOn[0], vm.post.createdOn[1], vm.post.createdOn[2]);
                });

            CommentService.findAllCommentsForPost(vm.postId)
                .then(function(response) {
                    vm.comments = response.data;
                    for(var i in vm.comments) {
                        vm.comments[i].timestamp = new Date(vm.comments[i].timestamp);
                        UserService.findUserById(vm.comments[i].userId)
                            .then(function(resp) {
                                console.log(resp);
                                var user = resp.data;
                                vm.comments[i].firstName = user.firstName;
                                vm.comments[i].lastName = user.lastName;
                            });
                    }
                    console.log(vm.comments);
                });
        };
        init();

        function removeComment(commentId,$index) {
            CommentService.deleteCommentById(commentId)
                .then(function(response) {
                    vm.comments.splice($index, 1);
                })
        }

        function addComment(comment) {
            console.log("Add");
            if(!vm.currentUser) {
                vm.message = "Please login to leave a comment";
                return;
            }

            var newComment = {
                userId: vm.currentUser._id,
                postId: vm.postId,
                timestamp: new Date(),
                content: comment
            };
            CommentService.createComment(newComment)
                .then(function(response) {
                    var comm = response.data;
                    comm.firstName = vm.currentUser.firstName;
                    comm.lastName = vm.currentUser.lastName;
                    vm.comments.push(comm);
                    vm.comment = {};
                });
        }

        function isOwnPost() {
            if (!vm.currentUser) {
                return false;
            }
            return vm.post.userId == vm.currentUser._id;
        }

        function isOwnerOrCommenter(userId) {
            return (vm.currentUser != null) && (vm.isOwnPost() || (userId == vm.currentUser._id));
        }
    }
})();
