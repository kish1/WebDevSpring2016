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
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:userHandle?", {
                templateUrl: "views/users/user.view.html",
                controller: "UserController",
                controllerAs: "model"
            })
            .when("/users", {
                templateUrl: "views/users/users.view.html",
                controller: "UsersController",
                controllerAs: "model"
            })
            .when("/post", {
                templateUrl: "views/posts/post.view.html",
                controller: "PostController",
                controllerAs: "model"
            })
            .when("/newpost", {
                templateUrl: "views/posts/newpost.view.html",
                controller: "NewpostController",
                controllerAs: "model"
            })
            .when("/readpost", {
                templateUrl: "views/posts/readpost.view.html",
                controller: "ReadpostController",
                controllerAs: "model"
            })
            .when("/editpost", {
                templateUrl: "views/posts/editpost.view.html",
                controller: "EditpostController",
                controllerAs: "model"
            })
            .when("/posts", {
                templateUrl: "views/posts/posts.view.html",
                controller: "PostsController",
                controllerAs: "model"
            })
            .when("/comments", {
                templateUrl: "views/comments/comments.view.html",
                controller: "CommentsController",
                controllerAs: "model"
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
