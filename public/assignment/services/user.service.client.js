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
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        };
        return service;

        function findUserByCredentials(username, password, callback) {
            var user;
            for(user in users) {
                if (user.username === username && user.password === passowrd) {
                    return callback(user);
                }
            }
            return callback(null);
        }

        function findAllUsers (callback) {
            return callback(users);
        }

        function createUser (user, callback) {
            var new_user = {
                _id : (new Date).getTime(),
                firstName : user.firstName,
                lastName : user.lastName,
                username : user.username,
                password : user.password,
                roles : user.roles
            };
            users.push(new_user);
            return callback(new_user);
        }

        function deleteUserById (userId, callback) {
            var user, index;
            for(user in users) {
                if (user._id === userId) {
                    index = users.indexOf(user);
                    users.splice(index, 1);
                    return callback(users);
                }
            }
        }

        function updateUser (userId, user, callback) {
            var existing_user;
            for (existing_user in users) {
                if (existing_user._id === userId) {
                    existing_user.firstName = user.firstName;
                    existing_user.lastName = user.lastName;
                    existing_user.username = user.username;
                    existing_user.password = user.password;
                    //existing_user.roles = user.roles;
                    return callback(existing_user);
                }
                return callback(null);
            }
        }
    }

})();
