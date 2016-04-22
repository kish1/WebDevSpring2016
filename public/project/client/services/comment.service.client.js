/**
 * Created by kishore on 3/11/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .factory("CommentService", CommentService);

    function CommentService($http) {
        var service = {
            findAllComments: findAllComments,
            findAllCommentsForPost: findAllCommentsForPost,
            createComment: createComment,
            updateCommentById: updateCommentById,
            deleteCommentById: deleteCommentById
        };
        return service;

        function findAllComments() {
            return $http.get("/api/project/comment");
        }

        function findAllCommentsForPost(postId) {
            return $http.get("/api/project/comment/" + postId);
        }

        function createComment(comment) {
            return $http.post("/api/project/comment", comment);
        }

        function updateCommentById(commentId, comment) {
            var newComment = JSON.parse(JSON.stringify(comment));
            delete newComment._id;
            return $http.put("/api/project/comment/" + commentId, newComment);
        }

        function deleteCommentById(commentId) {
            return $http.delete("/api/project/comment/" + commentId);
        }
    }


})();
