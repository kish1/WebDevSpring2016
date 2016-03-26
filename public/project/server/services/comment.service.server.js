/**
 * Created by kishore on 3/25/16.
 */
module.exports = function(app, commentModel) {
    app.get("/api/project/comment", findAllComments);
    app.get("/api/project/comment/:id", findAllCommentsForPost);
    app.post("/api/project/comment", createComment);
    app.put("/api/project/comment/:id", updateCommentById);
    app.delete("/api/project/comment/:id", deleteCommentById);

    function deleteCommentById(req, res) {
        var commentId = req.params.id;
        res.json(commentModel.deleteCommentById(commentId));
    }

    function updateCommentById(req, res) {
        var commentId = req.params.id;
        var comment = req.body;
        res.json(commentModel.updateCommentById(commentId, comment));
    }

    function createComment(req, res) {
        var comment = req.body;
        res.json(commentModel.createComment(comment));
    }

    function findAllCommentsForPost(req, res) {
        var postId = req.params.id;
        res.json(commentModel.findAllCommentsForPost(postId));
    }

    function findAllComments(req, res) {
        res.json(commentModel.findAllComments());
    }
}
