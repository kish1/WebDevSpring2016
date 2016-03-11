/**
 * Created by kishore on 3/10/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .controller("UsersController", UsersController);

    function UsersController($scope, UserService) {
        $scope.today = getToday();
        $scope.user = {dob: getToday()};
        $scope.users = UserService.findAllUsers(identity);

        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.selectUser = selectUser;
        $scope.deleteUser = deleteUser;

        function addUser(user) {
            UserService.createUser(user, identity);
            $scope.user = {dob: getToday()};
        }

        function updateUser(user) {
            UserService.updateUserById(user._id, user, identity);
            $scope.user = {dob: getToday()};
        }

        function selectUser(index) {
            $scope.user = {
                _id:         $scope.users[index]._id,
                firstName:   $scope.users[index].firstName,
                lastName:    $scope.users[index].lastName,
                email:       $scope.users[index].email,
                password:    $scope.users[index].password,
                dob:         $scope.users[index].dob,
                gender:      $scope.users[index].gender,
                description: $scope.users[index].description,
                admin:       $scope.users[index].admin
            }
        }

        function deleteUser(index) {
            UserService.deleteUserById($scope.users[index]._id, identity);
            //$scope.users.splice(index, 1);
        }

        function getToday() {
            return new Date().toISOString().substring(0, 10);
        }

        function identity(param) {
            return param;
        }
    }
})();