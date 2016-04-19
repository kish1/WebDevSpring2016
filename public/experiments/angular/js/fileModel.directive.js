/**
 * Created by kishore on 4/18/16.
 */
(function () {
    angular
        .module("SomeDBApp")
        .directive("fileModel", fileModel);

    function fileModel($parse) {
        return {
            restrict: "A",
            link: linkFunction
        };

        function linkFunction(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind("change", function() {
               modelSetter(scope, element[0].files[0]);
            });
        }
    }
})();

