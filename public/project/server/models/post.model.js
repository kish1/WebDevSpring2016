/**
 * Created by kishore on 3/25/16.
 */
module.exports = function() {
    var uuid = require("node-uuid");
    var mock = require("./mock.post.json");
    var api = {
        findAllPosts: findAllPosts,
        findPostById: findPostById,
        findAllPostsForUser: findAllPostsForUser,
        createPost: createPost,
        updatePostById: updatePostById,
        deletePostById: deletePostById
    };
    return api;

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
        var date = new Date(post.createdOn);
        var newPost = {
            _id: uuid.v1(),
            userId: uId,
            name: post.name,
            createdOn: [date.getFullYear().toString(), date.getMonth().toString(), date.getDate().toString()],
            content: post.content,
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
