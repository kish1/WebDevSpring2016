/**
 * Created by kishore on 3/17/16.
 */
"use strict";
var q = require('q');

module.exports = function(db, mongoose) {
    var UserSchema = require("./user.schema.server")(mongoose);
    var UserModel = mongoose.model('User', UserSchema);


    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById : findUserById,
        updateUserById: updateUserById,
        deleteUserById: deleteUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials
    };
    return api;

    function createUser(user) {
        var newUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            emails: user.emails,
            phones: []
        };

        var deferred = q.defer();
        UserModel.create(newUser, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find({}, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function updateUserById(userId, user) {
        var newUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            emails: user.emails,
        };
        var deferred = q.defer();
        UserModel.findByIdAndUpdate(userId,{$set: newUser} , {new: true}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        UserModel.findByIdAndRemove(userId, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }


    function findUserByUsername(username_value) {
        var deferred = q.defer();
        UserModel.findOne({username: username_value}, function (err, user) {
           if (err) {
               deferred.reject(err);
           } else {
               deferred.resolve(user);
           }
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModel.findOne(
            {username: credentials.username, password: credentials.password},
            function (err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function dbCallback(err, results) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(results);
        }
    }
};