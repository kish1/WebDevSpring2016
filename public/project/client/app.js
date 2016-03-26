/**
 * Created by kishore on 3/10/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp", ["ngRoute", "ngSanitize", "ngAnimate", "ui.bootstrap"]);
})();

function clientReady(){
    gapi.client.setApiKey("AIzaSyCx9cGg3yPKiWiMJyUGRAxKCCg5hlMKOqw");
    gapi.client.load("youtube", "v3", function () {});
}

