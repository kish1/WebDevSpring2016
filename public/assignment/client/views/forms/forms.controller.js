/**
 * Created by kishore on 3/1/16.
 */
"use strict";
(function () {
    angular.module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, UserService, $location) {
        var vm = this;
        vm.currentUser = null;
        vm.currentUserId = null;
        vm.forms = null;
        vm.form = null;


        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.selectForm = selectForm;
        vm.deleteForm = deleteForm;
        vm.goToFields = goToFields;

        var init = function () {
            vm.currentUser = UserService.getCurrentUser();
            if (!vm.currentUser) {
                $location.url('/home');
                return;
            }
            vm.currentUserId = vm.currentUser._id;
            FormService
                .findAllFormsForUser(vm.currentUserId)
                .then(function (response) {
                    vm.forms = response.data;
                });
            //console.log(vm.forms);
        };
        init();

        function goToFields(index) {
            $location.url("/form/"+ vm.forms[index]._id + "/fields")
        }

        function addForm(form) {
            FormService
                .createFormForUser(vm.currentUserId,{
                title : form.title
            })
                .then(function (response) {
                   if (response.data) {
                       vm.forms.push(response.data);
                       vm.form = {};
                   }
                });
        }

        function updateForm(form) {
            FormService
                .updateFormById(form._id, form)
                .then(function (response) {
                    FormService
                        .findAllFormsForUser(vm.currentUserId)
                        .then(function (response) {
                            vm.forms = response.data;
                        });
                });

            vm.form = {};
        }

        function selectForm(index) {
            vm.form = {
                _id: vm.forms[index]._id,
                title: vm.forms[index].title,
                userId: vm.forms[index].userId
            }
        }

        function deleteForm(index) {
            FormService.deleteFormById(vm.forms[index]._id)
                .then(function (response) {
                    vm.forms.splice(index,1);
                });
        }
    }
})();
