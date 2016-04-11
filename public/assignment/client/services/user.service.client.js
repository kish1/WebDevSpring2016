/**
 * Created by kishore on 3/1/16.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {
        $rootScope.currentUser = null;

        var service = {
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,

            login: login,
            logout: logout,
            getLoggedIn: getLoggedIn,

            findUserByUsername : findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;

        function login(credentials) {
            return $http.post("/api/assignment/login", credentials);
        }

        function logout(user) {
            return $http.post("/api/assignment/logout", user);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/loggedin");
        }

        function getLoggedIn() {
            return $http.post("/api/assignment/loggedin", {});
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById (userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

        function updateUser (userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }
    }

})();
