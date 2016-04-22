/**
 * Created by kishore on 3/25/16.
 */
module.exports = function(db, mongoose) {
    var q = require("q");
//    var uuid = require("node-uuid");
//    var mock = require("./mock.post.json");
    var PostSchema = require("./post.schema.server.js")(mongoose);
    var PostModel = mongoose.model('post', PostSchema);
    var api = {
        findAllPosts: findAllPosts,
        findPostById: findPostById,
        findLastPostsForUser: findLastPostsForUser,
        findAllPostsForUser: findAllPostsForUser,
        createPost: createPost,
        updatePostById: updatePostById,
        deletePostById: deletePostById,

        createStarForPost: createStarForPost,
        deleteStarForPost: deleteStarForPost,
        findStarsForPost: findStarsForPost,
        findStarCountForPost: findStarCountForPost
    };
    return api;

    function findStarCountForPost(postId) {
        var deferred = q.defer();
        return PostModel.aggregate([{$match: {"_id": new mongoose.Types.ObjectId(postId)}}, {$project: {"starrersCount": {$size: '$starrers'}}}],
        function (err, val) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(val[0]);
            }
        });
        return deferred.promise;
    }

    function findStarsForPost(postId, start, count) {
        start = parseInt(start);
        count = parseInt(count);
        return PostModel.findById(postId, {starrers: {$slice: [start, start+count]}, name: 1});
    }

    function deleteStarForPost(postId, userId) {
        return PostModel.findByIdAndUpdate(postId, {$pullAll: {"starrers": [userId]}});
    }

    function createStarForPost(postId, userId) {
        return PostModel.findByIdAndUpdate(postId, {$addToSet: {"starrers": userId}});
    }

    function findLastPostsForUser(userId, count) {
        return PostModel.find({"userId": userId}, {"starrers": 0}).sort({_id: -1}).limit(parseInt(count));
    }

    function findAllPosts() {
        return PostModel.find();
    }

    function deletePostById(postId) {
        return PostModel.findByIdAndRemove(postId);
    }

    function updatePostById(postId, post) {
        return PostModel.findByIdAndUpdate(postId, {$set: post}, {"starrers": 0});
    }

    function createPost(userId, post) {
        var newPost = {
            userId: userId,
            name: post.name,
            tags: post.tags,
            createdOn: post.createdOn,
            content: post.content,
            starrers: []
        };
        console.log(newPost);
        return PostModel.create(newPost);
    }

    function findPostById(postId) {
        var deferred = q.defer();
        PostModel.aggregate([{$match: {"_id": mongoose.Types.ObjectId(postId)}}, {$project: {
            "userId": 1,
            "name": 1,
            "tags": 1,
            "createdOn": 1,
            "content": 1,
            "starrersCount": {$size: '$starrers'}
        }}], function(err, val) {
            deferred.resolve(val[0]);
        });
        return deferred.promise;
    }

    function findAllPostsForUser(userId) {
        return PostModel.find({"userId": userId}, {"name": 1});
    }
};
