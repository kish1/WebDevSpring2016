/**
 * Created by kishore on 3/1/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration ($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "home/home.view.html",
                controller: "home/home.controller.js"
            })
            .when("/profile", {
                templateUrl: "users/profile.view.html",
                controller: "users/profile.controller.js"
            })
            .when("/login", {
                templateUrl: "users/login.view.html",
                controller: "users/login.controller.js"
            })
            .when("/register", {
                templateUrl: "users/register.view.html",
                controller: "users/register.controller.js"
            })
            .when("/admin", {
                templateUrl: "admin/admin.view.html",
                controller: "admin/admin.controller.js"
            })
            .when("/forms", {
                templateUrl: "forms/forms.view.html",
                controller: "forms/forms.controller.js"
            })
            .when("/fields", {
                templateUrl: "forms/fields.view.html",
                controller: "forms/fields.controller.js"
            })
            .otherwise({
                redirectTo: "/home"
            });

    }
})();
