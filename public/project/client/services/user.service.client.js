/**
 * Created by kishore on 3/10/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        $rootScope.currentUser = null;

        var service = {
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,

            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            findUserByHandle: findUserByHandle,
            findNameByUserId: findNameByUserId,
            createUser: createUser,
            updateUserById: updateUserById,
            updateDisplayPictureById: updateDisplayPictureById,
            deleteUserById: deleteUserById,

            login: login,
            logout: logout
        };
        return service;

        function findUserByHandle(handle) {
            return $http.get("/api/project/user/handle/" + handle);
        }

        function findNameByUserId(userId) {
            return $http.get("/api/project/user/name/" + userId);
        }

        function findUserById(userId) {
            return $http.get("/api/project/user/" + userId);
        }

        function login(credentials) {
            return $http.post("/api/project/login", credentials);
        }

        function logout(user) {
            return $http.post("/api/project/logout", user);
        }


        function getCurrentUser() {
            return $http.get("/api/project/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function findUserByCredentials(email, password) {
            return $http.get("/api/project/user?handle=" + email + "&password=" + password);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function createUser(user) {
            var newUser = {
                displayPicture: user.displayPicture,
                handle: user.handle,
                firstName:   user.firstName,
                lastName:    user.lastName,
                email:       user.email,
                password:    user.password,
                dob:         user.dob,
                gender:      user.gender,
                description: user.description,
                followers: [],
                following: [],
                starred: [],
                isAdmin:     user.isAdmin != null
            };
            return $http.post("/api/project/user", newUser);
        }

        function updateUserById(userId, user) {
            var newUser = JSON.parse(JSON.stringify(user));
            delete newUser._id;
            return $http.put("/api/project/user/" + userId, newUser);
        }


        function updateDisplayPictureById(userId, displayPicture) {
            var fd = new FormData();
            /*
            for(var i in userData) {
                fd.append(i, userData[i]);
            }*/
            fd.append("displayPicture", displayPicture);
            return $http.put("/api/project/user/" + userId + "/dp", fd, {
                transformRequest: angular.identity,
                headers: {"Content-Type": undefined}
            });

        }

        function deleteUserById (userId) {
            return $http.delete("/api/project/user/" + userId);
        }
    }
})();
