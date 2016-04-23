/**
 * Created by kishore on 4/22/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .factory("AdminService", AdminService);

    function AdminService($http) {
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findAllUsers: findAllUsers,
            updateUserById: updateUserById,
            deleteUserById: deleteUserById
        };
        return api;

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/admin/user/" + userId);
        }

        function updateUserById(userId, user) {
            var newUser = JSON.parse(JSON.stringify(user));
            delete newUser._id;
            return $http.put("/api/assignment/admin/user/" + userId, newUser);
        }

        function findUserById(userId) {
            return $http.get("/api/assignment/admin/user/" + userId);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/admin/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/admin/user", user);
        }
    }

})();
