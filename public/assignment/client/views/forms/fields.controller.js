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
        vm.cancelEdit = cancelEdit;
        vm.update = update;

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
                    vm.fields = response.data.fields;
                    console.log(vm.fields);
                });


        };
        init();

        function cancelEdit() {
            vm.edit = false;
        }

        function update(label, placeholder, type) {
            console.log(placeholder);
            vm.field.label = label;
            if (["TEXT", "TEXTAREA"].indexOf(type) > -1) {
                vm.field.placeholder = placeholder;
                FieldService.updateField(vm.formId, vm.field._id, vm.field)
                    .then(function (resp) {
                        vm.fields = resp.data;
                    });
            } else if (["OPTIONS", "CHECKBOXES", "RADIOS"].indexOf(type) > -1) {
                var text = placeholder.split("\n");
                var options = [];
                for(var i in text) {
                    var opt = text[i].split(":");
                    options.push({
                        label: opt[0],
                        value: opt[1]
                    });
                }
                console.log(options);
                vm.field.options = options;
            }
            FieldService
                .updateField(vm.formId, vm.field._id, vm.field)
                .then(function(resp) {
                    vm.fields = resp.data;
                });
            vm.edit = false;
        }

        function selectField(index) {
            var titleMap = {
                "TEXT": "Single Line Field",
                "TEXTAREA": "Multiple Line Field",
                "DATE": "Date Field",
                "OPTIONS": "Dropdown Field",
                "CHECKBOXES": "Checkbox Field",
                "RADIOS": "Radio Button Field"
            };
            vm.field = vm.fields[index];
            vm.edit = true;
            vm.editTitle = titleMap[vm.field.type];
            vm.editLabel = vm.field.label;
            console.log(vm.field.type);
            if (["TEXT", "TEXTAREA"].indexOf(vm.field.type) > -1) {
                vm.editValue = vm.field.placeholder;
            } else if (["OPTIONS", "CHECKBOXES", "RADIOS"].indexOf(vm.field.type) > -1) {
                var text = "";
                for(var i in vm.field.options) {
                    var line = vm.field.options[i].label + ":" + vm.field.options[i].value + "\n";
                    text = text + line;
                    //console.log(text);
                }
                vm.editValue = text;
            }
            //console.log(vm.field);
        }

        function removeField(index) {
            console.log(vm.fields);
            FieldService
                .deleteFieldFromForm(vm.formId, vm.fields[index]._id)
                .then(function (r) {
                    vm.fields.splice(index, 1);
                    console.log(vm.fields);
                },
                function (err) {
                    console.log(err);
                });
        }



        function addField(fieldType) {
            console.log("working " + fieldType);
            FieldService
                .createFieldForForm(vm.formId, {
                    _id: null,
                    type: fieldType
                })
                .then(function (resp) {
                    vm.fields = resp.data;
                });
        }

    }
})();
