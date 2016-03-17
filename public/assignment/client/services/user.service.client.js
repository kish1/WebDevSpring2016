/**
 * Created by kishore on 3/1/16.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [];
        users = [
            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]                },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]                },
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]                },
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]                }
        ];
        var service = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;

        function findUserByCredentials(username, password, callback) {
            for(var i in users) {
                if (users[i].username == username && users[i].password == password) {
                    return callback(users[i]);
                }
            }
            return callback(null);
        }

        function findAllUsers (callback) {
            return callback(users);
        }

        function createUser (user, callback) {
            var new_user = {
                _id: (new Date).getTime(),
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                email: user.email,
                roles: (user.roles)? user.roles : []
            };
            users.push(new_user);
            return callback(new_user);
        }

        function deleteUserById (userId, callback) {
            for(var i in users) {
                if (users[i]._id === userId) {
                    users.splice(i, 1);
                    return callback(users);
                }
            }
            return callback(users);
        }

        function updateUser (userId, user, callback) {
            for (var i in users) {
                if (users[i]._id === userId) {
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    users[i].username = user.username;
                    users[i].password = user.password;
                    users[i].email = user.email

                    return callback(users[i]);
                }
            }
            return callback(null);
        }
    }

})();
