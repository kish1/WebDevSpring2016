/**
 * Created by kishore on 3/17/16.
 */
module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getUserResolver);
    app.get("/api/assignment/user/:id", findUserById);
    //app.get("/api/assignment/user?username=username", findUserByUsername);
    //app.get("/api/assignment/user?username=username&password=password", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function getUserResolver(req, res) {
        if (req.query.username == null && req.query.password == null) {
            return findAllUsers(req, res);
        } else if (req.query.username != null && req.query.password == null) {
            return findUserByUsername(req, res);
        } else {
            return findUserByCredentials(req, res);
        }
    }

    function createUser(req, res) {
        var newUser = req.body;
        newUser = userModel.createUser(newUser);
        res.json(newUser);
    }

    function findAllUsers(req, res) {
        var users = userModel.findAllUsers();
        res.json(users);
    }

    function findUserById(req, res) {
        var id = req.params.id;
        var user = userModel.findUserById(id);
        res.json(user);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        var user = userModel.findUserByUsername(username);
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }

    function updateUserById(req, res) {
        var id = req.params.id;
        var user = req.body;
        var users = userModel.updateUserById(id, user);
        res.json(users);
    }

    function deleteUserById(req, res) {
        var id = req.params.id;
        var users = userModel.deleteUserById(id);
    }
};