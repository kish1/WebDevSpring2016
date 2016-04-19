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
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser: createUser,
        updateUserById: updateUserById,
        updateDisplayPictureById: updateDisplayPictureById,
        deleteUserById: deleteUserById,
        findUserByCredentials: findUserByCredentials,

        createFollowing: createFollowing,
        deleteFollowing: deleteFollowing,
        findFollowCountForUser: findFollowCountForUser,
        findFollowersForUser: findFollowersForUser,
        findFollowingForUser: findFollowingForUser,

        createStarForUser: createStarForUser,
        deleteStarForUser: deleteStarForUser,
        findAllStarsForUser: findAllStarsForUser,
        findStarCountForUser: findStarCountForUser
  };
    return api;

    function findStarCountForUser(userId) {
        var deferred = q.defer();
        for(var i in users) {
            if (users[i]._id == userId) {
                deferred.resolve(users[i].starred.length);
                break;
            }
        }
        return deferred.promise;
    }

    function findAllStarsForUser(userId) {
        var deferred = q.defer();
        for(var i in users) {
            if (users[i]._id == userId) {
                deferred.resolve(users[i].starred);
                break;
            }
        }
        return deferred.promise;
    }

    function deleteStarForUser(userId, postId) {
        var deferred = q.defer();
        for(var i in users) {
            if (users[i]._id == userId) {
                for(var j in users[i].starred) {
                    if (users[i].starred[j] == postId) {
                        users[i].starred.splice(j, 1);
                        deferred.resolve();
                        return deferred.promise;
                    }
                }
                deferred.reject("post not found in user");
                return deferred.promise;
            }
        }
        deferred.reject("user not found in user");
        return deferred.promise;
    }

    function createStarForUser(userId, postId) {
        var deferred = q.defer();
        for(var i in users) {
            if (users[i]._id == userId && (! users[i].starred.indexOf(postId) > -1)) {
                users[i].starred.push(postId);
                deferred.resolve(users[i]);
                return deferred.promise;
            }
        }
        deferred.reject("user not found");
        return deferred.promise;
    }

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

    function updateDisplayPictureById(userId, name) {
        var deferred = q.defer();
        for(var i in users) {
            if (users[i]._id == userId) {
                users[i].displayPicture = name;
                deferred.resolve(name);
                return deferred.promise;
            }
        }
        deferred.reject("user not found");
        return deferred.promise;
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
                return users[i];
            }
        }
        return null;
    }

    function createUser(user) {
        var newUser = {
            _id: uuid.v1(),
            displayPicture: user.displayPicture,
            handle: user.handle,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            dob: user.dob,
            gender: user.gender,
            followers: [],
            following: [],
            starred: [],
            description: user.description,
            admin: user.admin
        };
        users.push(newUser);
        return newUser;
    }

    function findAllUsers() {
        return users;
    }
};