/**
 * Created by kishore on 4/16/16.
 */
module.exports = function (app, userModel) {
    app.post("/api/project/follow", createFollowing);
    app.get("/api/project/follow/count/user/:userId", findFollowCountForUser);
    app.get("/api/project/follow/followers/user/:userId", findFollowersForUser);
    app.get("/api/project/follow/following/user/:userId", findFollowingForUser);
    app.delete("/api/project/follow", deleteFollowing);

    function deleteFollowing(req, res) {
        var followerId = req.query.followerId;
        var followeeId = req.query.followeeId;
        //console.log(followerId + " "  + followeeId);
        userModel.deleteFollowing(followerId, followeeId)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFollowingForUser(req, res) {
        var userId = req.params.userId;
        var start = req.query.start;
        var count = req.query.count;
        userModel
            .findFollowingForUser(userId, start, count)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFollowersForUser(req, res) {
        var userId = req.params.userId;
        var start = req.query.start;
        var count = req.query.count;
        userModel
            .findFollowersForUser(userId, start, count)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFollowCountForUser(req, res) {
        var userId = req.params.userId;
        userModel
            .findFollowCountForUser(userId)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFollowing(req, res) {
        var followerId = req.body.followerId;
        var followeeId = req.body.followeeId;
        console.log(followerId + " "  + followeeId);
        userModel
            .createFollowing(followerId, followeeId)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}
