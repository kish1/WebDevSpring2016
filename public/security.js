/**
 * Created by kishore on 4/20/16.
 */
"use strict";
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, assignUserModel, projectUserModel) {

    app.post  ('/api/assignment/login', passport.authenticate('assign'), login);
    app.post  ('/api/assignment/logout',         logout);
    app.post  ('/api/assignment/register',       assignRegister);
    app.get   ('/api/assignment/loggedin',       loggedin);

    app.post  ('/api/project/login', passport.authenticate('project'), login);
    app.post  ('/api/project/logout',         logout);
    app.post  ('/api/project/register',       projectRegister);
    app.get   ('/api/project/loggedin',       loggedin);

    passport.use('assign',   new LocalStrategy(assignLocalStrategy));
    passport.use('project', new LocalStrategy({
            usernameField: 'handle',
            passwordField: 'password'
        },
        projectLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function login(req, res) {
        //console.log("executes");
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        //console.log("checks");
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function assignLocalStrategy(username, password, done) {
        assignUserModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if(!user) {
                        return done(null, false);
                    }
                    //console.log('local');
                    var newObj = JSON.parse(JSON.stringify(user));
                    newObj.type = 'assign';
                    return done(null, newObj);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function projectLocalStrategy(handle, password, done) {
        projectUserModel
            .findUserByCredentials({handle: handle, password: password})
            .then(
                function(user) {
                    if(!user) {
                        return done(null, false);
                    }
                    var newObj = JSON.parse(JSON.stringify(user));
                    newObj.type = 'project';
                    return done(null, newObj);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        if(user.type == 'assign') {
            assignUserModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        } else if(user.type == 'project') {
            projectUserModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }
    }


    function assignRegister(req, res) {
        var newUser = req.body;

        assignUserModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return assignUserModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function projectRegister(req, res) {
        var newUser = req.body;
        newUser.admin = false;

        projectUserModel
            .findUserByHandle(newUser.handle)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return projectUserModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

};


