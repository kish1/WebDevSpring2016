/**
 * Created by kishore on 3/11/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .factory("CommentService", CommentService);

    function CommentService() {
        var comments = [];
        comments = [
            {_id: "201", userId: "001", postId: "101", timestamp: new Date("2015", "5", "12", "13", "45", "23", "0"), content: "Cool!"},
            {_id: "202", userId: "002", postId: "101", timestamp: new Date("2015", "7", "25", "9", "12", "51", "0"), content: "Amazing!"},
            {_id: "203", userId: "003", postId: "102", timestamp: new Date("2015", "1", "8", "19", "36", "3", "0"), content: "Interesting."}
        ];
        var service = {
            findAllComments: findAllComments,
            createComment: createComment,
            updateCommentById: updateCommentById,
            deleteCommentById: deleteCommentById
        };
        return service;

        function findAllComments(callback) {
            return callback(comments);
        }

        function createComment(comment, callback) {
            var newComment = {
                _id: (new Date).getTime(),
                userId: comment.userId,
                postId: comment.postId,
                timestamp: comment.timestamp,
                content: comment.content
            };
            comments.push(newComment);
            return callback(newComment);
        }

        function updateCommentById(_id, comment, callback) {
            for(var i in comments) {
                if (comments[i]._id === _id) {
                    comments[i].userId = comment.userId;
                    comments[i].postId = comment.postId;
                    comments[i].timestamp = comment.timestamp;
                    comments[i].content = comment.content;

                    return callback(comments[i]);
                }
            }
            return callback(null);
        }

        function deleteCommentById(_id, callback) {
            for(var i in comments) {
                if (comments[i]._id === _id) {
                    comments.splice(i, 1);
                    return callback(comments);
                }
            }
            return callback(null);
        }
    }


})();
