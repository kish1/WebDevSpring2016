/**
 * Created by kishore on 4/19/16.
 */
(function () {
    angular
        .module("BlogApp")
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

