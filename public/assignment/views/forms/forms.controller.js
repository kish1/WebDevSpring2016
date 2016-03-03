/**
 * Created by kishore on 3/1/16.
 */
"use strict";
(function () {
    angular.module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService, $rootScope, $location) {
        if (!$rootScope.currentUser) {
            $location.url('/home');
            return;
        }
        $scope.currentUserId = $rootScope.currentUser._id;
        $scope.forms = FormService.findAllFormsForUser($scope.currentUserId, identity);
        $scope.selectedFormIndex = -1;

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.selectForm = selectForm;
        $scope.deleteForm = deleteForm;


        function addForm(form) {
            var newForm = FormService.createFormForUser($scope.currentUserId,{
                name : form.name
            }, identity);
            $scope.forms.push(newForm);
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

        function identity(param) {
            return param;
        }
    }
})();
