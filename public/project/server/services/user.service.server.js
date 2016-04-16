/**
 * Created by kishore on 3/23/16.
 */
"use strict";
module.exports = function (app, userModel) {
    app.get("/api/project/user", userResolve);
    app.get("/api/project/user/:id", findUserById);
    app.get("/api/project/user/name/:id", findNameByUserId);
    app.post("/api/project/user", createUser);
    app.put("/api/project/user/:id", updateUserById);
    app.delete("/api/project/user/:id", deleteUserById);

    function findNameByUserId(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json({
            firstName: user.firstName,
            lastName: user.lastName
        });
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        res.json(userModel.findUserById(userId));
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        res.json(userModel.deleteUserById(userId));
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;
        res.json(userModel.updateUserById(userId, user));
    }

    function createUser(req, res) {
        var user = req.body;
        res.json(userModel.createUser(user));
    }

    function userResolve(req, res) {
        if (req.query.handle == null && req.query.password == null) {
            findAllUsers(req, res);
        } else if (req.query.handle != null && req.query.password != null) {
            findUserByCredentials(req, res);
        } else {
            res.json([]);
        }
    }

    function findUserByCredentials(req, res) {
        var handle = req.query.handle;
        var password = req.query.password;
        res.json(userModel.findUserByCredentials(handle, password));
    }

    function findAllUsers(req, res) {
        res.json(userModel.findAllUsers());
    }
};