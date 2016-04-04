/**
 * Created by kishore on 3/17/16.
 */
module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.post("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/login", login);
    app.post("/api/assignment/logout", logout);
    app.get("/api/assignment/user", getUserResolver);
    app.get("/api/assignment/user/:id", findUserById);
    //app.get("/api/assignment/user?username=username", findUserByUsername);
    //app.get("/api/assignment/user?username=username&password=password", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function login(req, res) {
        var credentials = {
            username: req.body.username,
            password: req.body.password
        };
        userModel.findUserByCredentials(credentials)
            .then(function(user) {
                req.session.currentUser = user;
                res.json(user);
            });
    }

    function getUserResolver(req, res) {
        if (req.query.username == null && req.query.password == null) {
            findAllUsers(req, res);
        } else if (req.query.username != null && req.query.password == null) {
            return findUserByUsername(req, res);
        } else {
            findUserByCredentials(req, res);
        }
    }

    function createUser(req, res) {
        var newUser = req.body;
        userModel.createUser(newUser)
            .then(function (user) {
                req.session.currentUser = user;
                res.json(user);
            },
            function (err) {
                res.status(400).send(err);
            });

    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.json(users);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function findUserById(req, res) {
        var id = req.params.id;
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel.findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function findUserByCredentials(req, res) {
        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        userModel.findUserByCredentials(credentials)
            .then(function (user) {
                res.json(user);
            },
            function (err) {
                res.status(400).send(err);
            });

    }

    function updateUserById(req, res) {
        var id = req.params.id;
        var user = req.body;
        userModel.updateUserById(id, user)
            .then(function (user) {
                res.json(user);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function deleteUserById(req, res) {
        var id = req.params.id;
        var users = userModel.deleteUserById(id);
    }
};