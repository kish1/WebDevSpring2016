/**
 * Created by kishore on 3/1/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $rootScope, $location, AdminService) {
        var vm = this;
        vm.users = null;
        vm.user = null;
        vm.index = null;
        vm.message = null;

        vm.isSortedBy = null;
        vm.sortAsc = false;


        vm.createUser = createUser;
        vm.updateUser = updateUser;
        vm.selectUser = selectUser;
        vm.deleteUser = deleteUser;

        vm.sort = sort;

        var init = function () {
            AdminService
                .findAllUsers()
                .then(function (resp) {
                    vm.users = resp.data;
                });
        };
        init();

        function sort(field) {
            vm.index = null;
            vm.user = null;

            if (vm.isSortedBy == field) {
                vm.sortAsc = !vm.sortAsc;
            } else {
                vm.isSortedBy = field;
                vm.sortAsc = true;
            }

            vm.users.sort(
                function(a,b) {
                    if(vm.sortAsc) {
                        return a[vm.isSortedBy].localeCompare(b[vm.isSortedBy]);
                    } else {
                        return b[vm.isSortedBy].localeCompare(a[vm.isSortedBy]);
                    }
                }
            );
        }

        function updateUser(user) {
            AdminService
                .updateUserById(user._id, user)
                .then(function (resp) {
                    if (resp.data) {
                        vm.users[vm.index] = user;
                        vm.index = null;
                        vm.user = null;
                    }
                });
        }

        function selectUser($index) {
            vm.user = {
                _id: vm.users[$index]._id,
                firstName: vm.users[$index].firstName,
                lastName: vm.users[$index].lastName,
                username: vm.users[$index].username,
                password: vm.users[$index].password,
                emails: vm.users[$index].emails,
                phones: vm.users[$index].phones
            };
            vm.index = $index;
        }

        function createUser(user) {
            vm.message = null;
            AdminService
                .createUser(user)
                .then(
                    function(response) {
                        var newUser = response.data;
                        vm.users.push(newUser);
                        vm.user = null;
                    },
                    function (err) {
                        vm.message = "Could not create user";
                    }
                );
        }

        function deleteUser($index) {
            AdminService.deleteUserById(vm.users[$index]._id)
                .then(function(response) {
                    if (response.data) {
                        vm.users.splice($index, 1);
                    }
                });
        }
    }
})();
