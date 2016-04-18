/**
 * Created by kishore on 4/18/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .factory("StarService", StarService);

    function StarService($http) {
        var api = {
            createStar: createStar,
            deleteStar: deleteStar,
            findAllStarsForUser: findAllStarsForUser,
            findStarsForPost: findStarsForPost,
            findStarCountForUser: findStarCountForUser,
            findStarCountForPost: findStarCountForPost
        };
        return api;

        function findStarCountForPost(postId) {
            return $http.get("/api/project/star/count/post/" + postId);
        }

        function findStarCountForUser(userId) {
            return $http.get("/api/project/star/count/user/" + userId);
        }

        function findStarsForPost(postId, start, count) {
            return $http.get("/api/project/star/post/" + postId + "?start=" + start + "&count=" + count);
        }

        function findAllStarsForUser(userId) {
            return $http.get("/api/project/star/user/" + userId);
        }

        function deleteStar(userId, postId) {
            return $http.delete("/api/project/star?userId=" + userId + "&postId=" + postId);
        }

        function createStar(userId, postId) {
            var body = {
                userId: userId,
                postId: postId
            };
            return $http.post("/api/project/star", body);
        }

    }
})();
