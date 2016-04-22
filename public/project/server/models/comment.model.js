/**
 * Created by kishore on 3/25/16.
 */
module.exports = function(db, mongoose) {
    var CommentSchema = require("./comment.schema.server.js")(mongoose);
    var CommentModel = mongoose.model('Comment', CommentSchema);

    var api = {
        findAllComments: findAllComments,
        findAllCommentsForPost: findAllCommentsForPost,
        createComment: createComment,
        updateCommentById: updateCommentById,
        deleteCommentById: deleteCommentById
    };
    return api;

    function findAllComments() {
        return CommentModel.find();
    }

    function findAllCommentsForPost(postId) {
        return CommentModel.find({"postId": postId});
    }

    function createComment(comment) {
        var newComment = {
            userId: comment.userId,
            postId: comment.postId,
            timestamp: comment.timestamp,//[comment.timestamp.getFullYear(), comment.timestamp.getMonth(), comment.timestamp.getDate(), comment.timestamp.getHours(), comment.timestamp.getMinutes(), comment.timestamp.getSeconds(), comment.timestamp.getMilliseconds()],
            content: comment.content
        };
        console.log("comm");
        console.log(newComment);
        return CommentModel.create(newComment);
    }

    function updateCommentById(commentId, comment) {
        return CommentModel.findByIdAndUpdate(commentId, {$set: comment});
    }

    function deleteCommentById(commentId) {
        return CommentModel.findByIdAndRemove(commentId);
    }
}
