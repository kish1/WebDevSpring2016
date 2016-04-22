/**
 * Created by kishore on 4/18/16.
 */
module.exports = function (app, userModel, postModel) {
    app.post("/api/project/star", createStar);
    app.delete("/api/project/star", deleteStar);
    app.get("/api/project/star/all/user/:userId", findAllStarsForUser);
    app.get("/api/project/star/user/:userId", findStarsForUser);
    app.get("/api/project/star/post/:postId", findStarsForPost);
    app.get("/api/project/star/check", checkStarred);
    app.get("/api/project/star/count/user/:userId", findStarCountForUser);
    app.get("/api/project/star/count/post/:postId", findStarCountForPost);

    function checkStarred(req, res) {
        var userId = req.query.userId;
        var postId = req.query.postId;
        userModel
            .checkStarred(userId, postId)
            .then(
                function (resp) {
                    //console.log("cf");
                    res.json(resp[0].starred.length > 0);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findStarCountForPost(req, res) {
        var postId = req.params.postId;
        postModel
            .findStarCountForPost(postId)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findStarCountForUser(req, res) {
        var userId = req.params.userId;
        userModel
            .findStarCountForUser(userId)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findStarsForPost(req, res) {
        var postId = req.params.postId;
        var start = req.query.start;
        var count = req.query.count;
        postModel
            .findStarsForPost(postId, start, count)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findStarsForUser(req, res) {
        var postId = req.params.userId;
        var start = req.query.start;
        var count = req.query.count;
        userModel
            .findStarsForUser(postId, start, count)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllStarsForUser(req, res) {
        var userId = req.params.userId;
        userModel
            .findAllStarsForUser(userId)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteStar(req, res) {
        var userId = req.query.userId;
        var postId = req.query.postId;
        postModel
            .deleteStarForPost(postId, userId)
            .then(
                function (response) {
                    userModel
                        .deleteStarForUser(userId, postId)
                        .then(
                            function (resp) {
                                res.json(resp);
                            },
                            function (err) {
                                postModel
                                    .createStarForUser(userId, postId)
                                    .then(
                                        function (resp) {
                                            res.status(400).send("star not deleted, userModel failed");
                                        },
                                        function (err) {
                                            res.status(400).send("inconsistent: star deleted for post, not deleted for user");
                                        }
                                    );
                            }
                        );
                },
                function (err) {
                    res.status(400).send("star not deleted, postModel failed" + "\n" + err);
                }
            );
    }

    function createStar(req, res) {
        var userId = req.body.userId;
        var postId = req.body.postId;
        postModel
            .createStarForPost(postId, userId)
            .then(
                function (response) {
                    userModel
                        .createStarForUser(userId, postId)
                        .then(
                            function (resp) {
                                res.send(200);
                            },
                            function (err) {
                                postModel
                                    .deleteStarForPost(postId, userId)
                                    .then(
                                        function (resp) {
                                            res.status(400).send("star not created, userModel failed");
                                        },
                                        function (err) {
                                            res.status(400).send("inconsistent: star created for post, not created for user");
                                        }
                                    )
                            }
                        );
                },
                function (err) {
                    res.status(400).send("star not created, postModel failed")
                }
            );
    }
}
