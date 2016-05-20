/**
 * Created by kishore on 3/24/16.
 */
(function () {
    angular
        .module("BlogApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location) {
        var vm = this;
        vm.currentUser = null;
        vm.error = null;
        vm.success = null;
        vm.dp = "/project/images/default.jpg";
        vm.pictureFile = null;

        vm.updateUser = updateUser;
        vm.updateDisplayPicture = updateDisplayPicture;
        vm.date = date;

        var init = function() {
            UserService
                .getCurrentUser()
                .then(function (resp) {
                    vm.currentUser = resp.data;

                    vm.currentUser.dob = new Date(vm.currentUser.dob);

                    if (vm.currentUser.displayPicture) {
                        vm.dp = imageUrl(vm.currentUser.displayPicture);
                    }
                });
        };
        init();

        function date(dateObject) {
            if (dateObject) {
                return [dateObject.getMonth()+1, dateObject.getDate(), dateObject.getFullYear()].join('/');
            }
            return "";
        }

        function updateDisplayPicture(picture) {
            UserService
                .updateDisplayPictureById(vm.currentUser._id, picture)
                .then(function(resp) {
                    if(resp.data) {
                        vm.dp = imageUrl(resp.data.displayPicture);
                    }
                });
        }

        function updateUser(user) {
            vm.error = null;
            vm.success = null;
            UserService
                .updateUserById(vm.currentUser._id, JSON.parse(JSON.stringify(user)))
                .then(function (resp) {
                    if(resp.data) {
                        vm.currentUser = resp.data;
                        vm.currentUser.dob = new Date(vm.currentUser.dob);
                        vm.success = "User details updated successfully";
                    } else {
                        vm.message = "Could not update user details";
                    }
                })
        }

        function imageUrl(imageName) {
            return "http://" +  location.host +  "/images/dp/" + imageName;
        }

    }
})();
