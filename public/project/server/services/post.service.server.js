/**
 * Created by kishore on 3/25/16.
 */
"use strict";
module.exports = function(app, postModel) {
    app.get("/api/project/post/:id", findPostById);
    app.get("/api/project/post", postResolver);
    app.post("/api/project/post", createPost);
    app.put("/api/project/post/:id", updatePostById);
    app.delete("/api/project/post/:id", deletePostById);

    function deletePostById(req, res) {
        var postId = req.params.id;
        res.json(postModel.deletePostById(postId));
    }

    function updatePostById(req, res) {
        var postId = req.params.id;
        var post = req.body;
        res.json(postModel.updatePostById(postId, post));
    }

    function createPost(req, res) {
        var userId = req.query.userId;
        var post = req.body;
        res.json(postModel.createPost(userId, post));
    }

    function findPostById(req, res) {
        var postId = req.params.id;
        res.json(postModel.findPostById(postId));
    }

    function postResolver(req, res) {
        if (!req.query.userId) {
            findAllPosts(req, res);
        } else {
            findAllPostsForUser(req, res);
        }
    }

    function findAllPostsForUser(req, res) {
        var userId = req.query.userId;
        res.json(postModel.findAllPostsForUser(userId));
    }

    function findAllPosts(req, res) {
        res.json(postModel.findAllPosts());
    }

};