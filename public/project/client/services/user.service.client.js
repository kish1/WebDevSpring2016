/**
 * Created by kishore on 3/10/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [];
        users = [
            {"_id": "001", "firstName": "Lionel", "lastName": "Messi", "email":"leo@messi.com", "password": "thiago", "dob": new Date("1987", "5", "24"), "gender": "male", "description": "I'm Leo Messi", "admin":false},
            {"_id": "002", "firstName": "Saina", "lastName": "Nehwal", "email":"saina@nehwal.com", "password": "saina", "dob": new Date("1990", "2", "17"), "gender": "female", "description": "I'm Saina Nehwal", "admin":true},
            {"_id": "003", "firstName": "Mesut", "lastName": "Ozil", "email":"mesut@ozil.com", "password": "mesut", "dob": new Date("1988", "9", "15"), "gender": "male", "description": "I'm Mesut Ozil", "admin":false}
        ];
        var service = {
            findAllUsers: findAllUsers,
            createUser: createUser,
            updateUserById: updateUserById,
            deleteUserById: deleteUserById
        };
        return service;

        function findAllUsers(callback) {
            return callback(users);
        }

        function createUser(user, callback) {
            var newUser = {
                _id: (new Date).getTime(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                dob: user.dob,
                gender: user.gender,
                description: user.description,
                admin: user.admin != null
            };
            users.push(newUser);
            return callback(newUser);
        }

        function updateUserById(userId, user, callback) {
            for(var i in users) {
                if (users[i]._id === userId) {
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    users[i].email = user.email;
                    users[i].password = user.password;
                    users[i].dob = user.dob;
                    users[i].gender = user.gender;
                    users[i].description = user.description;
                    users[i].admin = user.admin;

                    return callback(users[i]);
                }
            }
            return callback(null);
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
    }
})();
