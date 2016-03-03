/**
 * Created by kishore on 3/1/16.
 */
"use strict";
(function () {
    angular.module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService, $rootScope, $location) {
        $scope.forms = [];
        $scope.selectedFormIndex = -1;

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.selectForm = selectForm;
        $scope.deleteForm = deleteForm;

        if (!$rootScope.currentUser) {
            $location.url('/home');
        }

        function addForm(form) {
            $scope.forms.push({
                name : form.name
            })
            $scope.form = {};
        }

        function updateForm(form) {
            $scope.forms[$scope.selectedFormIndex] = {
                name : form.name
            }
            $scope.form = {};
        }

        function selectForm(index) {
            $scope.selectedFormIndex = index;
            $scope.form = {
                name : $scope.forms[index].name
            }
        }

        function deleteForm(index) {
            $scope.forms.splice(index, 1);
        }
    }
})();
