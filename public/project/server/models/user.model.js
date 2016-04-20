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
        findAllStarsForUser: findAllStarsForUser,
        findStarCountForUser: findStarCountForUser
  };
    return api;

    function findStarCountForUser(userId) {
        return UserModel.aggregate([
            {$match: {"_id": userId}},
            {$project: {
                "starredCount": {$size: '$starred'}
            }
            }]);
    }

    function findAllStarsForUser(userId) {
        return UserModel.findById(userId, {starred: 1});
    }

    function deleteStarForUser(userId, postId) {
        return UserModel.findByIdAndUpdate(userId, {$pull: {starred: postId}}, {_id: 1});
    }

    function createStarForUser(userId, postId) {
        return UserModel.findByIdAndUpdate(userId, {$push: {starred: postId}}, {_id: 1});
    }

    function checkFollows(userId1, userId2) {
        return UserModel.findById(user1, {following: {$in: [userId2]}}, {_id: 1});
    }

    function findFollowingForUser(userId, start, count) {
        return UserModel.findById(userId, {following: {$slice: [start, start+count]}});
    }

    function findFollowersForUser(userId, start, count) {
        return UserModel.findById(userId, {followers: {$slice: [start, start+count]}});
    }

    function findFollowCountForUser(userId) {
        return UserModel.aggregate([
            {$match: {"_id": userId}},
            {$project: {
                "followersCount": {$size: '$followers'},
                "followingCount": {$size: '$following'}
            }
            }]);
    }

    function deleteFollowing(followerId, followeeId) {
        UserModel
            .findByIdAndUpdate(followerId, {$pull: {"following": followeeId}}, function (err, follower) {
                if (err) {
                    return q.defer().reject(err).promise;
                } else {
                    return UserModel.findByIdAndUpdate(followeeId, {$pull: {"followers": followerId}});
                }
            });
    }

    function createFollowing(followerId, followeeId) {
        UserModel
            .findByIdAndUpdate(followerId, {$push: {"following": followeeId}}, function(err, follower) {
               if (err) {
                   return q.defer().reject(err).promise;
               } else {
                   return UserModel.findByIdAndUpdate(followeeId, {$push: {"followers": followerId}});
               }
            });
    }

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
                console.log(err);
            } else {
                deferred.resolve(val[0]);
                console.log(val);
            }
        });
        return deferred.promise;
    }

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
        return UserModel.findByIdAndUpdate(userId, {$set: {displayPicture: name.toString()}}, {new: true, upsert: true, select: "displayPicture"});
    }

    function updateUserById(userId, user) {
        return UserModel.findByIdAndUpdate(userId, {$set: user}, {new: true, upsert: true, select: "handle firstName lastName email password dob gender description isAdmin"});
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
            description: user.description,
            isAdmin: user.isAdmin
        };
        return UserModel.create(newUser);
    }

    function findAllUsers() {
        return UserModel.find();
    }
};