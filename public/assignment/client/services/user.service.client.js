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
            register: register,
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
            return $http.get("/api/assignment/loggedin", {});
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }

        function updateUser (userId, user) {
            var newUser = JSON.parse(JSON.stringify(user));
            delete newUser._id;
            return $http.put("/api/assignment/user/" + userId, user);
        }
    }

})();
