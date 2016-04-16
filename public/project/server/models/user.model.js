/**
 * Created by kishore on 3/23/16.
 */
"use strict";
var q = require("q");
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
        createFollowing: createFollowing,
        deleteFollowing: deleteFollowing,
        findFollowCountForUser: findFollowCountForUser,
        findFollowersForUser: findFollowersForUser,
        findFollowingForUser: findFollowingForUser,


        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser: createUser,
        updateUserById: updateUserById,
        deleteUserById: deleteUserById,
        findUserByCredentials: findUserByCredentials
  };
    return api;

    function findFollowingForUser(userId, start, count) {
        var deferred = q.defer();
        if (start && count) {
            for(var i in users) {
                if (users[i]._id == userId) {
                    deferred.resolve(users[i].following.slice(start, start+count));
                    return deferred.promise;
                }
            }
            deferred.reject("user not found");
        } else {
            deferred.reject("Unclear start and count");
        }
        return deferred.promise;
    }

    function findFollowersForUser(userId, start, count) {
        var deferred = q.defer();
        if (start && count) {
            for(var i in users) {
                if (users[i]._id == userId) {
                    deferred.resolve(users[i].followers.slice(start, count));
                    return deferred.promise;
                }
            }
            deferred.reject("user not found");
        } else {
            deferred.reject("Unclear start and count");
        }

        return deferred.promise;
    }

    function findFollowCountForUser(userId) {
        var deferred = q.defer();
        for(var i in users) {
            if (users[i]._id == userId) {
                var ret = {
                    followersCount: users[i].followers.length,
                    followingCount: users[i].following.length
                };
                deferred.resolve(ret);
                return deferred.promise;
            }
        }
        deferred.reject("user not found");
        return deferred.promise;
    }

    function deleteFollowing(followerId, followeeId) {
        //console.log(followerId + " "  + followeeId);
        var deferred = q.defer();
        var ret = {
            follower: null,
            followee: null
        };

        if (followerId === followeeId) {
            deferred.resolve(ret);
            return deferred.promise;
        }
        for(var i in users) {
            if (users[i]._id == followerId) {
                for(var j in users[i].following) {
                    if (users[i].following[j] == followeeId) {
                        users[i].following.splice(j, 1);
                        ret.follower = users[i];
                        break;
                    }
                }
                break;
            }
        }
        for(var i in users) {
            if (users[i]._id == followeeId) {
                for(var j in users[i].followers) {
                    if (users[i].followers[j] == followerId) {
                        users[i].followers.splice(j, 1);
                        ret.followee = users[i];
                        break;
                    }
                }
                break;
            }
        }
        deferred.resolve(ret);
        return deferred.promise;
    }

    function createFollowing(followerId, followeeId) {
        //console.log(followerId + " "  + followeeId);
        var deferred = q.defer();
        var ret = {
            follower: null,
            followee: null
        };

        if (followerId === followeeId) {
            deferred.resolve(ret);
            return deferred.promise;
        }
        for(var i in users) {
            if (users[i]._id == followerId && (!users[i].following.indexOf(followeeId) > -1)) {
                users[i].following.push(followeeId);
                ret.follower = users[i];
                break;
            }
        }
        for(var i in users) {
            if (users[i]._id == followeeId && (!users[i].followers.indexOf(followerId) > -1)) {
                users[i].followers.push(followerId);
                ret.followee = users[i];
                break;
            }
        }
        deferred.resolve(ret);
        return deferred.promise;
    }

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
                users[i].followers = user.followers;
                users[i].following = user.following;
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