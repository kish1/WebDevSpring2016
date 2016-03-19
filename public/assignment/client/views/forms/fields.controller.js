/**
 * Created by kishore on 3/1/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService, UserService, FormService, $location) {
        var vm = this;

        vm.currentUser = null;
        vm.currentUserId = null;
        vm.formId = null;
        vm.fields = null;
        vm.field = null;
        vm.edit = false;

        vm.addField = addField;
        vm.removeField = removeField;
        vm.selectField = selectField;

        var init = function () {
            if (!UserService.getCurrentUser()) {
                $location.url('/home');
                return;
            }
            vm.currentUser = UserService.getCurrentUser();
            vm.currentUserId = vm.currentUser._id;
            /*
            FormService
                .findAllFormsForUser(vm.currentUserId)
                .then(function (response) {
                    vm.formId = response.data[0]._id;
                    //console.log(vm.formId);
                    FieldService
                        .getFieldsForForm(vm.formId)
                        .then(function(response) {
                            vm.fields = response.data;
                            console.log(response);
                            console.log(vm.fields);
                        });
                });
            */
            vm.formId = $location.path().split("/")[2];
            FieldService
                .getFieldsForForm(vm.formId)
                .then(function(response) {
                    vm.fields = response.data;
                    //console.log(response);
                    //console.log(vm.fields);
                });


        };
        init();

        function selectField(index) {
            vm.field = vm.fields[index];
            vm.edit = true;
            console.log(vm.field);
        }

        function removeField(index) {
            FieldService
                .deleteFieldFromForm(vm.formId, vm.fields[index]._id)
                .then(function (r) {
                    FieldService
                        .getFieldsForForm(vm.formId)
                        .then(function (response) {
                            vm.fields = response.data;
                        });
                });
        }



        function addField(fieldType) {
            console.log("working " + fieldType);
            FieldService
                .createFieldForForm(vm.formId, {
                    _id: null,
                    type: fieldType
                })
                .then(function (r) {
                    FieldService
                        .getFieldsForForm(vm.formId)
                        .then(function (response) {
                            vm.fields = response.data;
                        });
                });
        }

    }
})();
