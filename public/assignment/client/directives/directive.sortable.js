/**
 * Created by kishore on 4/13/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .directive("sortable", sortable);

    function sortable() {
        function link(scope, element, attrs) {
            var start = null;
            var end   = null;
            $(element)
                .sortable({
                    axis: "y",
                    sort: function(event, ui) {
                        //ui.helper.find("a").hide();
                        start = ui.item.index();
                    },
                    stop: function(event, ui) {
                        //ui.item.find("a").show();
                        end = ui.item.index();
                        if(start >= end) {
                            start--;
                        }
                        scope.sortableCallback({start: start, end: end});
                    }
                });
        }
        return {
            scope: {
                sortableCallback: '&'
            },
            link: link
        };
    }
})();
