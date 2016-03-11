/**
 * Created by kishore on 3/10/16.
 */
"use strict";

(function () {
    angular
        .module("BlogApp")
        .factory("PostService", PostService);

    function PostService() {
        var posts = [];
        posts = [
            {_id: "101", userId: "001", name: "The Alps", createdOn: new Date("2015", "7", "28"), content: "<h1>The Swiss Alps</h1><p>I recently visited...</p>"},
            {_id: "102", userId: "001", name: "Latest Trends in JS", createdOn: new Date("2015", "2", "16"), content: "<h1>What's hot in JavaScript...</h1><p>Over the years...</p>"},
            {_id: "103", userId: "003", name: "My New Recipe", createdOn: new Date("2015", "5", "9"), content: "<h1>Latest Recipe</h1><p>Last week...</p>"}
        ];
        var service = {
            findAllPosts: findAllPosts,
            createPost: createPost,
            updatePostById: updatePostById,
            deletePostById: deletePostById
        };
        return service;

        function findAllPosts(callback) {
            return callback(posts);
        }

        function createPost(post, callback) {
            var newPost = {
                _id:       (new Date).getTime(),
                userId:    post.userId,
                name:      post.name,
                createdOn: post.createdOn,
                content:   post.content
            };
            posts.push(newPost);
            return callback(newPost);
        }

        function updatePostById(_id, post, callback) {
            for(var i in posts) {
                if (posts[i]._id === _id) {
                    posts[i].userId = post.userId;
                    posts[i].name = post.name;
                    posts[i].createdOn = post.createdOn;
                    posts[i].content = post.content;
                    return callback(posts[i])
                }
            }
            return callback(null);
        }

        function deletePostById(_id, callback) {
            for(var i in posts) {
                if (posts[i]._id === _id) {
                    posts.splice(i, 1);
                    return callback(posts);
                }
            }
            return callback(posts);
        }
    }
})();
