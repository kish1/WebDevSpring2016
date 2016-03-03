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


        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.selectForm = selectForm;
        $scope.deleteForm = deleteForm;


        function addForm(form) {
            var newForm = FormService.createFormForUser($scope.currentUserId,{
                title : form.title
            }, identity);
            $scope.forms.push(newForm);
            $scope.form = {};
        }

        function updateForm(form) {
            FormService.updateFormById(form._id, form, identity);
            $scope.form = {};
        }

        function selectForm(index) {
            $scope.form = {
                _id: $scope.forms[index]._id,
                title: $scope.forms[index].title,
                userId: $scope.forms[index].userId
            }
        }

        function deleteForm(index) {
            FormService.deleteFormById($scope.forms[index]._id, identity);
            $scope.forms.splice(index, 1);
        }

        function identity(param) {
            return param;
        }
    }
})();
