/**
 * Created by kishore on 3/17/16.
 */
//var passport      = require('passport');
//var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, userModel) {

    var auth = authorized;
    //app.post  ('/api/assignment/login', passport.authenticate('local'), login);
    //app.post  ('/api/assignment/logout',         logout);
    //app.post  ('/api/assignment/register',       register);
    //app.get   ('/api/assignment/loggedin',       loggedin);
    app.get   ("/api/assignment/user",          auth, findUserByCredentials);
    app.get   ("/api/assignment/user/:id",      auth, findUserById);
    app.get   ('/api/assignment/user',            getUserResolver);
    app.put   ('/api/assignment/user/:id',   auth, updateUserById);

    function getUserResolver(req, res) {
        if (req.query.username != null && req.query.password == null) {
            return findUserByUsername(req, res);
        } else {
            findUserByCredentials(req, res);
        }
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

    function findNameByUserId(req, res) {
        var userId = req.params.userId;
        userModel
            .findNameByUserId(userId)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function updateUserById(req, res) {
        var newUser = req.body;
        userModel
            .updateUserById(req.params.id, newUser)
            .then(
                function(user){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
};