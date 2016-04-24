/**
 * Created by kishore on 3/23/16.
 */
"use strict";
var q = require("q");
//var uuid = require("node-uuid");
//var users = require("./mock.user.json");

module.exports = function(db, mongoose) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('user', UserSchema);

    var api = {
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser: createUser,
        updateUserById: updateUserById,
        updateDisplayPictureById: updateDisplayPictureById,
        deleteUserById: deleteUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByHandle: findUserByHandle,

        createFollowing: createFollowing,
        deleteFollowing: deleteFollowing,
        findFollowCountForUser: findFollowCountForUser,
        findFollowersForUser: findFollowersForUser,
        findFollowingForUser: findFollowingForUser,
        checkFollows: checkFollows,

        createStarForUser: createStarForUser,
        deleteStarForUser: deleteStarForUser,
        checkStarred: checkStarred,
        findAllStarsForUser: findAllStarsForUser,
        findStarsForUser: findStarsForUser,
        findStarCountForUser: findStarCountForUser
  };
    return api;

    function findStarCountForUser(userId) {
        return UserModel.findById(userId, "handle starredCount");
    }
/*
    function findStarCountForUser(userId) {
        var deferred = q.defer();
        return UserModel.aggregate([
            {$match: {"_id": new mongoose.Types.ObjectId(userId)}},
            {$project: {
                "starredCount": {$size: '$starred'}
            }
            }], function (err, val) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(val[0]);
            }
        });
        return deferred.promise;
    }
*/
    function findStarsForUser(userId, start, count) {
        start = parseInt(start);
        count = parseInt(count);

        return UserModel.findById(userId, {starred: {$slice: [start, start+count]}, handle: 1});
    }

    function findAllStarsForUser(userId) {
        return UserModel.findById(userId, {starred: 1});
    }

    function deleteStarForUser(userId, postId) {
        return UserModel.findByIdAndUpdate(userId, {$pullAll: {starred: [postId]}, $inc: {"starredCount": -1}}, {_id: 1});
    }

    function createStarForUser(userId, postId) {
        return UserModel.findByIdAndUpdate(userId, {$addToSet: {starred: postId}, $inc: {"starredCount": 1}}, {_id: 1});
    }

    function checkStarred(userId, postId) {
        return UserModel.find({"_id": userId}, {starred: {$elemMatch: {$not: {$ne: mongoose.Schema.ObjectId(postId)}}}});
    }

    function checkFollows(userId1, userId2) {
        return UserModel.find({"_id": userId1}, {following: {$elemMatch: {$not: {$ne: mongoose.Schema.ObjectId(userId2)}}}});
    }

    function findFollowingForUser(userId, start, count) {
        start = parseInt(start);
        count = parseInt(count);
        return UserModel.findById(userId, {following: {$slice: [start, start+count]}, handle: 1});
    }

    function findFollowersForUser(userId, start, count) {
        start = parseInt(start);
        count = parseInt(count);

        return UserModel.findById(userId, {followers: {$slice: [start, start+count]}, handle: 1});
    }

    function findFollowCountForUser(userId) {
        return UserModel.findById(userId, "handle followersCount followingCount");
    }
/*
    function findFollowCountForUser(userId) {
        var deferred = q.defer();
        return UserModel.aggregate([
            {$match: {"_id": new mongoose.Types.ObjectId(userId)}},
            {$project: {
                "handle": 1,
                "followersCount": {$size: '$followers'},
                "followingCount": {$size: '$following'}
            }
            }], function (err, val) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(val[0]);
            }
        });
        return deferred.promise;
    }
*/
    function deleteFollowing(followerId, followeeId) {
        var deferred = q.defer();
        UserModel
            .findByIdAndUpdate(followerId, {$pullAll: {"following": [followeeId]}, $inc: {"followingCount": -1}}, function (err, follower) {
                if (err) {
                    deferred.reject(err);
                } else {
                    UserModel.findByIdAndUpdate(followeeId, {$pullAll: {"followers": [followerId]}, $inc: {"followersCount": -1}}, {select: {_id: 1}}, function (err, following) {
                        if (err) {
                            deferred.reject("inconsistent: " + err);
                        } else {
                            deferred.resolve(following);
                        }
                    });
                }
            });
        return deferred.promise;
    }


    function createFollowing(followerId, followeeId) {
        var deferred = q.defer();
        UserModel
            .findByIdAndUpdate(followerId, {$addToSet: {"following": followeeId}, $inc: {"followingCount": 1}}, function(err, follower) {
               if (err) {
                   deferred.reject(err);
               } else {
                   UserModel.findByIdAndUpdate(followeeId, {$addToSet: {"followers": followerId}, $inc: {"followersCount": 1}}, {select: {_id: 1}}, function (err, following) {
                       if (err) {
                           deferred.reject("inconsistent: " + err);
                       } else {
                           deferred.resolve(following);
                       }
                   });
               }
            });
        return deferred.promise;
    }

    function findUserByHandle(userHandle) {
        return UserModel.findOne({"handle": userHandle}, "displayPicture handle email password gender dob firstName lastName description isAdmin followersCount followingCount starredCount");
    }
/*
    function findUserByHandle(userHandle) {
        var deferred = q.defer();
        UserModel.aggregate([
            {$match: {"handle": userHandle}},
            {$project: {
                "displayPicture": 1,
                "handle": 1,
                "firstName": 1,
                "lastName": 1,
                "description": 1,
                "isAdmin": 1,
                "followersCount": {$size: '$followers'},
                "followingCount": {$size: '$following'},
                "starredCount": {$size: '$starred'}
            }
            }], function (err, val) {
            if (err) {
                deferred.reject(err);

            } else {
                deferred.resolve(val[0]);
            }
        });
        return deferred.promise;
    }
*/
    function findUserById(userId) {
        return UserModel.findById(userId, "displayPicture handle email password gender dob firstName lastName description isAdmin");
    }

    function findUserByCredentials(credentials) {
        return UserModel.findOne({handle: credentials.handle, password: credentials.password}, "handle firstName lastName description isAdmin");
    }

    function deleteUserById(userId) {
        return UserModel.findByIdAndRemove(userId);
    }

    function updateDisplayPictureById(userId, name) {
        return UserModel.findByIdAndUpdate(userId, {$set: {displayPicture: name.toString()}}, {upsert: true, select: "displayPicture"});
    }

    function updateUserById(userId, user) {
        return UserModel.findByIdAndUpdate(userId, {$set: user}, {new: true}).select("handle firstName lastName email password dob gender description isAdmin");
    }

    function createUser(user) {
        var newUser = {
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
            followersCount: 0,
            followingCount: 0,
            starredCount: 0,
            description: user.description,
            isAdmin: user.isAdmin
        };
        return UserModel.create(newUser);
    }

    function findAllUsers() {
        return UserModel.find({}, "handle email password gender dob firstName lastName description isAdmin");
    }
};