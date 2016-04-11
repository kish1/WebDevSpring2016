/**
 * Created by kishore on 3/1/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $rootScope, $location) {
        var vm = this;
        vm.message = null;
        vm.error = null;
        vm.currentUser = null;

        vm.update = update;

        var init = function () {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    if(response.data) {
                        vm.currentUser = response.data;
                        vm.details = {
                            username: vm.currentUser.username,
                            password: vm.currentUser.password,
                            firstName: vm.currentUser.firstName,
                            lastName: vm.currentUser.lastName,
                            email: vm.currentUser.emails? vm.currentUser.emails[0] : null
                        }
                    } else {
                        vm.error = "User details not available";
                    }

                },
                function (err) {
                    vm.error = err;
                    vm.message = "Error fetching user details";
                });

        };
        init();


        function update(details) {
            if (details) {
                var updatedDetails = {
                    username: details.username,
                    password: details.password,
                    firstName: details.firstName,
                    lastName: details.lastName,
                    emails: [details.email]
                };
                UserService.updateUser(vm.currentUser._id, updatedDetails)
                    .then(function(response) {
                        UserService.setCurrentUser(response.data);
                        vm.message = "User details updated successfully";
                    },
                    function (err) {
                        vm.error = "Server could not update user details";
                    });

            } else {
                vm.error = "Unable to update user details";
            }

        }

    }
})();
