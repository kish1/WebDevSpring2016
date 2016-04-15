/**
 * Created by kishore on 3/1/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService, UserService, FormService, $location, $uibModal, $log) {
        var vm = this;

        vm.currentUser = null;
        vm.currentUserId = null;
        vm.formId = null;
        vm.fields = null;
        vm.field = null;

        vm.addField = addField;
        vm.removeField = removeField;
        vm.selectField = selectField;
        vm.sortFields = sortFields;

        var init = function () {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    vm.currentUser = response.data;
                    if (!vm.currentUser) {
                        $location.url('/home');
                        return;
                    }
                    vm.currentUserId = vm.currentUser._id;

                    vm.formId = $location.path().split("/")[2];
                    FieldService
                        .getFieldsForForm(vm.formId)
                        .then(function(response) {
                            vm.fields = response.data.fields;
                            console.log(vm.fields);
                        });
                });

        };
        init();

        function sortFields(start, end) {
            FieldService
                .updateFieldOrderInForm(vm.formId, start, end)
                .then(
                    function (respone) {
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }

        function update(result) {
            var label = result.label;
            var placeholder = result.value;
            var type = result.type;

            vm.field.label = label;
            if (["TEXT", "TEXTAREA", "DATE"].indexOf(type) > -1) {
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
            vm.field = vm.fields[index];
            launchSelectModal('md', update);
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

        function launchSelectModal(size, someFunction) {
            var modalInstance = $uibModal.open({
                animation: true,//$scope.animationsEnabled,
                templateUrl: 'views/forms/field-update.modal.view.html',
                controller: modalController,
                size: size,
                resolve: {
                    field: function () {
                        return vm.field;
                    }
                }
            });

            modalInstance.result.then(someFunction, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }


        function modalController($scope, $uibModalInstance, field) {
            $scope.field = field;
            $scope.titleMap = {
                "TEXT": "Single Line Field",
                "TEXTAREA": "Multiple Line Field",
                "DATE": "Date Field",
                "OPTIONS": "Dropdown Field",
                "CHECKBOXES": "Checkbox Field",
                "RADIOS": "Radio Button Field"
            };
            $scope.fieldLabel = $scope.field.label;
            $scope.fieldValue = extractFieldValue($scope.field);

            $scope.ok = ok;
            $scope.cancel = cancel;
            $scope.isSingleLineField = isSingleLineField;
            $scope.isMultiLineField = isMultiLineField;
            $scope.isOption = isOption;

            function ok() {
                $uibModalInstance.close({
                    label: $scope.fieldLabel,
                    value: $scope.fieldValue,
                    type: $scope.field.type
                });
            };

            function cancel() {
                $uibModalInstance.dismiss('cancel');
            };

            function isSingleLineField() {
                return field.type === "TEXT";
            }

            function isMultiLineField() {
                return field.type === "TEXTAREA";
            }

            function isOption() {
                return ["OPTIONS", "CHECKBOXES", "RADIOS"].indexOf($scope.field.type) > -1;
            }

            function optionsToText(options) {
                var text = "";
                for(var i in options) {
                    text += options[i].label + ":" + options[i].value + "\n";
                }
                return text;
            }

            function extractFieldValue(field) {
                if (["TEXT", "TEXTAREA", "DATE"].indexOf(field.type) > -1) {
                    return field.placeholder;
                } else if (["OPTIONS", "CHECKBOXES", "RADIOS"].indexOf(field.type) > -1) {
                    return optionsToText(field.options);
                }
                return null;
            }

        }

    }
})();
