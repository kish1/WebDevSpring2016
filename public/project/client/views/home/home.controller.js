/**
 * Created by kishore on 3/10/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .controller("HomeController", HomeController);

    function HomeController(StarService) {
        StarService
            .deleteStar("002", "101")
            .then(
                function (resp) {
                    console.log(resp);
                },
                function (err) {
                    console.log(err);
                }
            );
    }
})();

