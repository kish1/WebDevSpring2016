/**
 * Created by kishore on 3/10/16.
 */
"use strict";

(function () {
    angular
        .module("BlogApp")
        .factory("PostService", PostService);

    function PostService($http) {

        var service = {
            findAllPosts: findAllPosts,
            findPostById: findPostById,
            findAllPostsForUser: findAllPostsForUser,
            findLastPostsForUser: findLastPostsForUser,
            createPost: createPost,
            updatePostById: updatePostById,
            deletePostById: deletePostById
        };
        return service;

        function findAllPosts() {
            return $http.get("/api/project/post");
        }

        function findLastPostsForUser(userId, count) {
            return $http.get("/api/project/post/user/" + userId + "/lastn/" + count);
        }

        function findPostById(postId) {
            return $http.get("/api/project/post/" + postId);
        }

        function findAllPostsForUser(userId) {
            return $http.get("/api/project/all/post/user/" + userId);
        }

        function createPost(post) {
            return $http.post("/api/project/post", post);
        }

        function updatePostById(postId, post) {
            return $http.put("/api/project/post/" + postId, post);
        }

        function deletePostById(postId) {
            return $http.delete("/api/project/post/" + postId);
        }
    }
})();
