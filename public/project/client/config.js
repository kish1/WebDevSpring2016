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
            .when("/users", {
                templateUrl: "views/users/users.view.html",
                controller: "UsersController"
            })
            .when("/posts", {
            templateUrl: "views/posts/posts.view.html",
            controller: "PostsController"
            })
            .when("/comments", {
                templateUrl: "views/comments.view.html",
                controller: "CommentsController"
            })
            .otherwise({
                redirectTo:"/home"
            });
    }
})();
