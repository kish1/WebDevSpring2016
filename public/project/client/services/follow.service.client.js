/**
 * Created by kishore on 4/16/16.
 */
(function () {
    angular
        .module("BlogApp")
        .factory("FollowService", FollowService);

    function FollowService($http) {
        var api = {
            createFollowing: createFollowing,
            findFollowCountForUser: findFollowCountForUser,
            findFollowersForUser: findFollowersForUser,
            findFollowingForUser: findFollowingForUser,
            deleteFollowing: deleteFollowing
        };
        return api;

        function deleteFollowing(followerId, followeeId) {
            return $http.delete("/api/project/follow?followerId=" + followerId + "&followeeId=" + followeeId);
        }

        function findFollowingForUser(userId, start, count) {
            return $http.get("/api/project/follow/following/user/" + userId + "?start=" + start + "&count=" + count);
        }

        function findFollowersForUser(userId, start, count) {
            return $http.get("/api/project/follow/followers/user/" + userId + "?start=" + start + "&count=" + count);
        }

        function findFollowCountForUser(userId) {
            return $http.get("/api/project/follow/count/user/" + count);
        }

        function createFollowing(followerId, followeeId) {
            var body = {
                followerId: followerId,
                followeeId: followeeId
            };
            return $http.post("/api/project/follow", body);
        }
    }
})();
