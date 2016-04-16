/**
 * Created by kishore on 3/23/16.
 */
"use strict";
var uuid = require("node-uuid");
var users = require("./mock.user.json");
(function() {
    for(var i in users) {
        var d = users[i].dob;
        users[i].dob = new Date(d[0], d[1], d[2]);
    }
    //console.log(users);
})();
module.exports = function() {
    var api = {
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser: createUser,
        updateUserById: updateUserById,
        deleteUserById: deleteUserById,
        findUserByCredentials: findUserByCredentials
  };
    return api;

    function findUserById(userId) {
        for(var i in users) {
            if (users[i]._id == userId) {
                return users[i];
            }
        }
        return null;
    }

    function findUserByCredentials(handle, password) {
        for(var i in users) {
            if (users[i].handle == handle && users[i].password == password) {
                return users[i];
            }
        }
        return null;
    }

    function deleteUserById(userId) {
        for(var i in users) {
            if(users[i]._id == userId) {
                users.splice(i, 1);
                break;
            }
        }
        return users;
    }

    function updateUserById(userId, user) {
        //console.log(user);
        //console.log(userId);
        for(var i in users) {
            if (users[i]._id == userId) {
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                users[i].email = user.email;
                users[i].password = user.password;
                users[i].dob = user.dob;
                users[i].gender = user.gender;
                users[i].description = user.description;
                users[i].admin = (user.admin != null);
                //users[i].question = user.question;
                //users[i].answer = user.answer;
                return users[i];
            }
        }
        return null;
    }

    function createUser(user) {
        var newUser = {
            _id: uuid.v1(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            dob: user.dob,
            gender: user.gender,
            description: user.description,
            admin: user.admin
            //question: user.question,
            //answer: user.answer
        };
        users.push(newUser);
        return newUser;
    }

    function findAllUsers() {
        return users;
    }
};