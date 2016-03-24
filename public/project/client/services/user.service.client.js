/**
 * Created by kishore on 3/10/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .factory("UserService", UserService);

    function UserService($http) {
        var service = {
            findAllUsers: findAllUsers,
            createUser: createUser,
            updateUserById: updateUserById,
            deleteUserById: deleteUserById
        };
        return service;

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function createUser(user) {
            var newUser = {
                _id:         (new Date).getTime(),
                firstName:   user.firstName,
                lastName:    user.lastName,
                email:       user.email,
                password:    user.password,
                dob:         user.dob,
                gender:      user.gender,
                description: user.description,
                admin:       user.admin != null
            };
            return $http.post("/api/project/user", newUser);
        }

        function updateUserById(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        }

        function deleteUserById (userId) {
            return $http.delete("/api/project/user/" + userId);
        }
    }
})();
