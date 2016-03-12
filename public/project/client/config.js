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
                templateUrl: "views/comments/comments.view.html",
                controller: "CommentsController"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .when("/details", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController",
            })
            .otherwise({
                redirectTo:"/home"
            });
    }
})();
