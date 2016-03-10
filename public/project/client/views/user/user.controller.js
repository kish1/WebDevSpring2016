/**
 * Created by kishore on 3/10/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .controller("UserController", UserController);

    function UserController($scope, UserService) {
        $scope.user = [];
        $scope.users = UserService.findAllUsers(identity);

        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.selectUser = selectUser;
        $scope.deleteUser = deleteUser;

        function addUser(user) {
            UserService.createUser(user, identity);
            $scope.user = [];
        }

        function updateUser(user) {

        }

        function selectUser(index) {

        }

        function deleteUser(index) {

        }

        function identity(param) {
            return param;
        }
    }
})();