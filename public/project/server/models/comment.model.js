/**
 * Created by kishore on 3/25/16.
 */
module.exports = function() {
    var uuid = require("node-uuid");
    var mock = require("./mock.comment.json");
    (function() {
        for(var i in mock) {
            mock[i].timestamp = new Date(mock[i].timestamp[0], mock[i].timestamp[1],mock[i].timestamp[2], mock[i].timestamp[3], mock[i].timestamp[4], mock[i].timestamp[5], mock[i].timestamp[6]);
        }
    })();

    var api = {
        findAllComments: findAllComments,
        findAllCommentsForPost: findAllCommentsForPost,
        createComment: createComment,
        updateCommentById: updateCommentById,
        deleteCommentById: deleteCommentById
    };
    return api;

    function findAllComments() {
        return mock;
    }

    function findAllCommentsForPost(postId) {
        var comments = [];
        for(var i in mock) {
            if (mock[i].postId == postId) {
                comments.push(mock[i]);
            }
        }
        return comments;
    }

    function createComment(comment) {
        var newComment = {
            _id: uuid.v1(),
            userId: comment.userId,
            postId: comment.postId,
            timestamp: comment.timestamp,//[comment.timestamp.getFullYear(), comment.timestamp.getMonth(), comment.timestamp.getDate(), comment.timestamp.getHours(), comment.timestamp.getMinutes(), comment.timestamp.getSeconds(), comment.timestamp.getMilliseconds()],
            content: comment.content
        };
        mock.push(newComment);
        return newComment;
    }

    function updateCommentById(commentId, comment) {
        for(var i in mock) {
            if (mock[i]._id == commentId) {
                mock[i].timestamp = comment.timestamp;
                mock[i].content = comment.content;
                return mock[i];
            }
        }
        return null;
    }

    function deleteCommentById(commentId) {
        for(var i in mock) {
            if (mock[i]._id == commentId) {
                mock.splice(i, 1);
                break;
            }
        }
        return mock;
    }
}
