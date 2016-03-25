/**
 * Created by kishore on 3/19/16.
 */
(function() {
    angular
        .module("SomeDBApp")
        .controller("ModalController", controller);

    function controller($scope, $uibModal, $log) {
        var vm = this;
        vm.open = function (size, someArray) {
            //console.log("reached");

            var modalInstance = $uibModal.open({
                animation: true,//$scope.animationsEnabled,
                templateUrl: 'modal.view.html',
                controller: function ($scope, $uibModalInstance, items) {
                    $scope.values = items;
                    console.log(items);
                },
                size: size,
                resolve: {
                    items: function () {
                        return someArray;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

    }
}})();
