/**
 * Created by kishore on 3/10/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope) {
        console.log("Header Loaded");
    }
})();
