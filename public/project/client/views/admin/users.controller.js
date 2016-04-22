/**
 * Created by kishore on 3/10/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .controller("UsersController", UsersController);

    function UsersController($scope, UserService) {
        var vm = this;
        
        vm.today = getToday();
        vm.user = {dob: getToday()};
        vm.users = [];
        vm.message = null;
        vm.index = null;

        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.selectUser = selectUser;
        vm.deleteUser = deleteUser;


        var init = function() {
            UserService
                .findAllUsers()
                .then(function(response) {
                    vm.users = response.data;
                    for(var i in vm.users) {
                        vm.users[i].dob = new Date(vm.users[i].dob);
                    }
                });
        };
        init();
        //console.log(vm);
        //console.log(this);


        function addUser(user) {
            vm.message = null;
            UserService
                .createUser(user)
                .then(
                    function(response) {
                        var newUser = response.data;
                        console.log(newUser);
                        newUser.dob = new Date(newUser.dob);
                        vm.users.push(newUser);
                    },
                    function (err) {
                        console.log(JSON.parse(JSON.stringify(err)));
                        vm.message = "Could not create user";
                    }
                );
            vm.user = {dob: getToday()};
        }

        function updateUser(user) {
            vm.message = null;
            delete user.handle;
            UserService
                .updateUserById(user._id, user)
                .then(
                    function (response) {
                        user.handle = vm.users[vm.index].handle;
                        vm.users[vm.index] = user;
                        vm.index = null;
                    },
                    function (err) {
                        vm.message="Could not update user"
                    });
            vm.user = {dob: getToday()};
        }

        function selectUser(index) {
            vm.user = {
                _id:         vm.users[index]._id,
                firstName:   vm.users[index].firstName,
                lastName:    vm.users[index].lastName,
                email:       vm.users[index].email,
                password:    vm.users[index].password,
                dob:         vm.users[index].dob,
                gender:      vm.users[index].gender,
                description: vm.users[index].description,
                isAdmin:       vm.users[index].isAdmin
            }
            vm.index = index;
        }

        function deleteUser(index) {
            UserService.deleteUserById(vm.users[index]._id)
                .then(function(response) {
                    vm.users = response.data;
                });
            //vm.users.splice(index, 1);
        }

        function getToday() {
            //return new Date().toISOString().substring(0, 10);
            return new Date();
        }
    }
})();