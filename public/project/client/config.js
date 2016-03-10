/**
 * Created by kishore on 3/10/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/user", {
                templateUrl: "views/user/user.view.html",
                controller: "UserController"
            })
            .otherwise({
                redirectTo:"/home"
            });
    }
})();
