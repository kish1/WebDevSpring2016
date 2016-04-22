/**
 * Created by kishore on 3/25/16.
 */
"use strict";
module.exports = function(app, postModel) {
    app.get("/api/project/post/:id", findPostById);
    app.get("/api/project/post", findAllPosts);
    app.get("/api/project/post/user/:userId", findAllPostsForUser);
    app.get("/api/project/post/user/:userId/lastn/:count", findLastPostsForUser);
    app.post("/api/project/post", createPost);
    app.put("/api/project/post/:id", updatePostById);
    app.delete("/api/project/post/:id", deletePostById);

    function deletePostById(req, res) {
        var postId = req.params.id;
        postModel
            .deletePostById(postId)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updatePostById(req, res) {
        var postId = req.params.id;
        var post = req.body;
        postModel
            .updatePostById(postId, post)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createPost(req, res) {
        var userId = req.body.userId;
        var post = req.body;
        postModel
            .createPost(userId, post)
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

    function findPostById(req, res) {
        var postId = req.params.id;
        var val = postModel
            .findPostById(postId)
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

    function findLastPostsForUser(req, res) {
        var userId = req.params.userId;
        var count = req.params.count;
        postModel
            .findLastPostsForUser(userId, count)
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

    function postResolver(req, res) {
        if (!req.query.userId) {
            findAllPosts(req, res);
        } else {
            findAllPostsForUser(req, res);
        }
    }

    function findAllPostsForUser(req, res) {
        var userId = req.params.userId;
        postModel
            .findAllPostsForUser(userId)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllPosts(req, res) {
        postModel
            .findAllPosts()
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};