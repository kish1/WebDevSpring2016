/**
 * Created by kishore on 3/11/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .controller("CommentsController", CommentsController);

    function CommentsController($scope, CommentService) {
        $scope.time = getTime();
        $scope.comment = {timestamp: getTime()};
        $scope.comments = CommentService.findAllComments(identity);

        $scope.addComment = addComment;
        $scope.selectComment = selectComment;
        $scope.updateComment = updateComment;
        $scope.deleteComment = deleteComment;

        function addComment(comment) {
            CommentService.createComment(comment, identity);
            $scope.comment = {timestamp: getTime()};
        }

        function updateComment(comment) {
            CommentService.updateCommentById(comment._id, comment, identity);
            $scope.comment = {timestamp: getTime()};
        }

        function selectComment(index) {
            $scope.comment = {
                _id: $scope.comments[index]._id,
                userId: $scope.comments[index].userId,
                postId: $scope.comments[index].postId,
                timestamp: $scope.comments[index].timestamp,
                content: $scope.comments[index].content
            };
        }

        function deleteComment(index) {
            CommentService.deleteCommentById($scope.comments[index]._id, identity);
        }

        function getTime() {
            return new Date();
        }

        function identity(param) {
            return param;
        }
    }
})();
