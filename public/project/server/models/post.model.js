/**
 * Created by kishore on 3/25/16.
 */
module.exports = function() {
    var q = require("q");
    var uuid = require("node-uuid");
    var mock = require("./mock.post.json");
    var api = {
        findAllPosts: findAllPosts,
        findPostById: findPostById,
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
        for(var i in mock) {
            if (mock[i]._id == postId) {
                deferred.resolve(mock[i].starrers.length);
                return deferred.promise;
            }
        }
        deferred.reject("post not found");
        return deferred.promise;
    }

    function findStarsForPost(postId, start, count) {
        var deferred = q.defer();
        for(var i in mock) {
            if (mock[i]._id == postId) {
                deferred.resolve(mock[i].starrers.slice(start, start+count));
                return deferred.promise;
            }
        }
        deferred.reject("post not found");
        return deferred.promise;
    }

    function deleteStarForPost(postId, userId) {
        //console.log("userId: " + userId);
        var deferred = q.defer();
        for(var i in mock) {
            if (mock[i]._id == postId) {
                for(var j in mock[i].starrers) {
                    console.log(mock[i].starrers[j] + " " + userId);
                    if (mock[i].starrers[j] == userId) {
                        mock[i].starrers.splice(j, 1);
                        deferred.resolve();
                        return deferred.promise;
                    }
                }
                deferred.reject("user not found in post")
            }
        }
        deferred.reject("post not found in post");
        return deferred.promise;
    }

    function createStarForPost(postId, userId) {
        var deferred = q.defer();
        for(var i in mock) {
            if (mock[i]._id == postId) {
                mock[i].starrers.push(userId);
                deferred.resolve(mock[i]);
                return deferred.promise;
            }
        }
        deferred.reject("post not found");
        return deferred.promise;
    }

    function findAllPosts() {
        return mock;
    }

    function deletePostById(postId) {
        for(var i in mock) {
            if (mock[i]._id == postId) {
                mock.splice(i, 1);
                break;
            }
        }
        return mock;
    }

    function updatePostById(postId, post) {
        for(var i in mock) {
            if (mock[i]._id == postId) {
                mock[i].name = post.name;
                mock[i].content = post.content;
                return mock[i];
            }
        }
        return null;
    }

    function createPost(uId, post) {
        console.log(post.createdOn);
        var date = new Date(post.createdOn);
        var newPost = {
            _id: uuid.v1(),
            userId: uId,
            name: post.name,
            createdOn: [date.getFullYear().toString(), date.getMonth().toString(), date.getDate().toString()],
            content: post.content,
            starrers: []
        };
        console.log(newPost.createdOn);
        mock.push(newPost);
        return newPost;
    }

    function findPostById(postId) {
        for(var i in mock) {
            if (mock[i]._id == postId) {
                return mock[i];
            }
        }
        return null;
    }

    function findAllPostsForUser(userId) {
        var posts = [];
        for(var i in mock) {
            if (mock[i].userId == userId) {
                posts.push(mock[i]);
            }
        }
        return posts;
    }
};
