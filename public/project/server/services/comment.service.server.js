/**
 * Created by kishore on 3/25/16.
 */
module.exports = function(app, commentModel) {
    var auth = authorized;

    app.get("/api/project/comment", auth, findAllComments);
    app.get("/api/project/comment/:id", findAllCommentsForPost);
    app.post("/api/project/comment", auth, createComment);
    app.put("/api/project/comment/:id", auth, updateCommentById);
    app.delete("/api/project/comment/:id", auth, deleteCommentById);

    function deleteCommentById(req, res) {
        var commentId = req.params.id;
        commentModel
            .deleteCommentById(commentId)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateCommentById(req, res) {
        var commentId = req.params.id;
        var comment = req.body;
        commentModel
            .updateCommentById(commentId, comment)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createComment(req, res) {
        var comment = req.body;
        commentModel
            .createComment(comment)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
            );
    }

    function findAllCommentsForPost(req, res) {
        var postId = req.params.id;
        commentModel
            .findAllCommentsForPost(postId)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllComments(req, res) {
        if (isAdmin(req.user)) {
            commentModel
                .findAllComments()
                .then(
                    function (resp) {
                        res.json(resp);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function isAdmin(user) {
        if(user.isAdmin) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
}
