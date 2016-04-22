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
        vm.message = null;
        vm.index = null;

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
            vm.message = null;
            CommentService.createComment(comment)
                .then(
                    function (response) {
                        var comm = response.data;
                        //comm.timestamp = new Date(comm.timestamp[0], comm.timestamp[1],comm.timestamp[2], comm.timestamp[3], comm.timestamp[4], comm.timestamp[5], comm.timestamp[6]);
                        vm.comments.push(comm);
                        vm.comment = {timestamp: getTime()};
                    },
                    function (err) {
                        console.log(JSON.parse(JSON.stringify(err)));
                        vm.message="Could not update post"
                    });
            }

        function updateComment(comment) {
            vm.message = null;
            CommentService.updateCommentById(comment._id, comment)
                .then(
                    function (response) {
                        vm.comments[vm.index] = comment;
                        vm.comment = {timestamp: getTime()};
                        vm.index = null;
                    },
                    function (err) {
                        console.log(JSON.parse(JSON.stringify(err)));
                        vm.message="Could not update post"
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
            vm.index = index;
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
