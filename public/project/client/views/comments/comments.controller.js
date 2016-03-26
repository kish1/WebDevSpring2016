/**
 * Created by kishore on 3/11/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .controller("CommentsController", CommentsController);

    function CommentsController(CommentService) {
        var vm = this;
        vm.time = getTime();
        vm.comment = {timestamp: getTime()};
        vm.comments = null;

        vm.addComment = addComment;
        vm.selectComment = selectComment;
        vm.updateComment = updateComment;
        vm.deleteComment = deleteComment;

        var init = function() {
            CommentService.findAllComments()
                .then(function(response) {
                    var comm = response.data;
                    /*
                    for(var i in vm.comm) {
                        comm[i].timestamp = new Date(comm[i].timestamp[0], comm[i].timestamp[1],comm[i].timestamp[2], comm[i].timestamp[3], comm[i].timestamp[4], comm[i].timestamp[5], comm[i].timestamp[6])
                    }*/
                    vm.comments = comm;
                });
        };
        init();
        function addComment(comment) {
            CommentService.createComment(comment)
                .then(function(response) {
                    var comm = response.data;
                    //comm.timestamp = new Date(comm.timestamp[0], comm.timestamp[1],comm.timestamp[2], comm.timestamp[3], comm.timestamp[4], comm.timestamp[5], comm.timestamp[6]);
                    vm.comments.push(comm);
                    vm.comment = {timestamp: getTime()};
                });

        }

        function updateComment(comment) {
            CommentService.updateCommentById(comment._id, comment)
                .then(function(response) {
                    for(var i in vm.comments) {
                        if (vm.comments[i]._id == comment._id) {
                            vm.comments[i] = response.data;
                            break;
                        }
                    }
                    vm.comment = {timestamp: getTime()};
                });
        }

        function selectComment(index) {
            vm.comment = {
                _id: vm.comments[index]._id,
                userId: vm.comments[index].userId,
                postId: vm.comments[index].postId,
                timestamp: vm.comments[index].timestamp,
                content: vm.comments[index].content
            };
        }

        function deleteComment(index) {
            CommentService.deleteCommentById(vm.comments[index]._id)
                .then(function(response) {
                    vm.comments = response.data;
                });
        }

        function getTime() {
            return new Date();
        }
    }
})();
