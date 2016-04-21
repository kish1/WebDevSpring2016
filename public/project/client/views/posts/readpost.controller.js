/**
 * Created by kishore on 3/25/16.
 */
"use strict";
(function() {
    angular
        .module("BlogApp")
        .controller("ReadpostController", ReadpostController);

    function ReadpostController($q, $location, $sce, PostService, UserService, CommentService) {
        var vm = this;

        vm.currentUser = null;
        vm.postId = null;
        vm.post = null;
        vm.postOwnerName = null;
        vm.comments = null;
        vm.comment = {};
        vm.message = null;

        vm.isOwnPost = isOwnPost;
        vm.addComment = addComment;
        vm.isOwnerOrCommenter = isOwnerOrCommenter;
        vm.removeComment = removeComment;
        vm.postOwner = postOwner;
        vm.editPost = editPost;
        vm.trust = trust;

        var init = function() {
            vm.postId = $location.search().postId;

            PostService.findPostById(vm.postId)
                .then(function(response) {
                    //console.log(response);
                    vm.post = response.data;
                    vm.post.createdOn = new Date(vm.post.createdOn);
                    //console.log(vm.post);

                    UserService.findNameByUserId(vm.post.userId)
                        .then(function (response) {
                            var data = response.data;
                            vm.postOwnerName = data.firstName + " " + data.lastName;
                            vm.postOwnerHandle = data.handle;
                            vm.postOwnerDP = imageUrl(data.displayPicture);
                        });

                    CommentService.findAllCommentsForPost(vm.postId)
                        .then(function(response) {
                            vm.comments = response.data;

                            var promises = vm.comments.map(function (x) {
                                return UserService.findNameByUserId(x.userId);
                            });

                            var userDetailsMap = {};
                            $q.all(promises)
                                .then(function(resp) {
                                    console.log(resp);
                                    //console.log(i);
                                    var name = resp.data;
                                    userDetailsMap[name._id] = name;
                                });

                            for(var i in vm.comments) {
                                vm.comments[i].timestamp = new Date(vm.comments[i].timestamp);
                                var userDetail = userDetailsMap[comments[i].userId];
                                vm.comments[i].firstName = userDetail.firstName;
                                vm.comments[i].lastName = userDetail.lastName;
                            }
                        });
                });
        };
        init();

        function trust(videoId) {

            return $sce.trustAsResourceUrl("http://youtube.com/embed/" + videoId);
        }

        function editPost() {
            $location.search("postId", vm.post._id).path("/editpost");
        }

        function postOwner() {
            $location.search("postId", null).path("/user/" + vm.postOwnerHandle);
        }

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

        function imageUrl(imageName) {
            return "http://" +  location.host +  "/project/server/images/dp/" + imageName;
        }
    }
})();
