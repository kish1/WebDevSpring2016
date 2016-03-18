/**
 * Created by kishore on 3/17/16.
 */
"use strict";
var uuid = require('node-uuid');
var mock = require("./user.mock.json");
//console.log(mock);
module.exports = function() {
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
            _id: uuid.v1(),
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password
        };
        mock.push(newUser);
        return newUser;
    }

    function findAllUsers() {
        return mock;
    }

    function findUserById(_id) {
        for(var i in mock) {
            if (mock[i]._id == _id) {
                return mock[i];
            }
        }
        return null;
    }

    function updateUserById(_id, user) {
        for(var i in mock) {
            if (mock[i]._id == _id) {
                mock[i].firstName = user.firstName;
                mock[i].lastName = user.lastName;
                mock[i].username = user.username;
                mock[i].password = user.password;
                break;
            }
        }
        return mock;
    }

    function deleteUserById(_id) {
        for(var i in mock) {
            if (mock[i]._id === _id) {
                mock.splice(i, 1);
                break;
            }
        }
        return mock;
    }


    function findUserByUsername(username) {
        for(var i in mock) {
            if (mock[i].username == username) {
                return mock[i];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for(var i in mock) {
            if (mock[i].username == credentials.username && mock[i].password == credentials.password) {
                return mock[i];
            }
        }
        return null;
    }
};