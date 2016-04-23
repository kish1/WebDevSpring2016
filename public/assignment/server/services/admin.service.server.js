/**
 * Created by kishore on 4/22/16.
 */
module.exports = function(app, userModel, formModel) {

    var auth = authorized;

    app.post  ("/api/assignment/admin/user",         auth,  createUser);
    app.get   ("/api/assignment/admin/user",         auth,  findAllUsers);
    app.get   ("/api/assignment/admin/user/:userId", auth,  findUserById);
    app.delete("/api/assignment/admin/user/:userId", auth,  deleteUserById);
    app.put   ("/api/assignment/admin/user/:userId", auth,  updateUserById);

    function updateUserById(req, res) {
        if (isAdmin(req.user))
        {
            var userId = req.params.userId;
            var user = req.body;
            userModel
                .updateUserById(userId, user)
                .then(
                    function (resp) {
                        res.json(resp);
                    },
                    function (err) {
                        res.status(400).send();
                    }
                );
        } else {
            res.status(403);
        }

    }

    function deleteUserById(req, res) {
        if (isAdmin(req.user))
        {
            var userId = req.params.userId;
            userModel
                .deleteUserById(userId)
                .then(
                    function (resp) {
                        res.json(resp);
                    },
                    function (err) {
                        res.status(400).send();
                    }
                );
        } else {
            res.status(403);
        }
    }

    function findUserById(req, res) {
        if (isAdmin(req.user))
        {
            var userId = req.params.userId;
            userModel
                .findUserById(userId)
                .then(
                    function (resp) {
                        res.json(resp);
                    },
                    function (err) {
                        res.status(400).send();
                    }
                );
        } else {
            res.status(403);
        }
    }

    function findAllUsers(req, res) {
        if (isAdmin(req.user))
        {
            userModel
                .findAllUsers()
                .then(
                    function (resp) {
                        res.json(resp);
                    },
                    function (err) {
                        res.status(400).send();
                    }
                );
        } else {
            res.status(403);
        }
    }

    function createUser(req, res) {
        if (isAdmin(req.user))
        {
            var user = req.body;
            userModel
                .createUser(user)
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
        if(user.username == "admin") {
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
    };
}
