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
                controller: "HomeController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkCurrentUser
                }
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
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userHandle?", {
                templateUrl: "views/users/user.view.html",
                controller: "UserController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkCurrentUser
                }
            })
            .when("/post/:userHandle?", {
                templateUrl: "views/posts/post.view.html",
                controller: "PostController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkCurrentUser
                }
            })
            .when("/newpost", {
                templateUrl: "views/posts/newpost.view.html",
                controller: "NewpostController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/readpost", {
                templateUrl: "views/posts/readpost.view.html",
                controller: "ReadpostController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkCurrentUser
                }
            })
            .when("/editpost", {
                templateUrl: "views/posts/editpost.view.html",
                controller: "EditpostController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                resolve: {
                    loggedIn: checkAdmin
                }
            })
            .when("/users", {
                templateUrl: "views/admin/users.view.html",
                controller: "UsersController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkAdmin
                }
            })
            .when("/posts", {
                templateUrl: "views/admin/posts.view.html",
                controller: "PostsController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkAdmin
                }
            })
            .when("/comments", {
                templateUrl: "views/admin/comments.view.html",
                controller: "CommentsController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkAdmin
                }
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

    function checkLoggedIn ($q, $timeout, $http, $location, $rootScope, UserService)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            console.log(user);
            $rootScope.errorMessage = null;
            // User is Authenticated

            if (user !== '0')
            {
                //$rootScope.currentUser = user;
                //console.log("valid");
                UserService.setCurrentUser(user);
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                console.log("checkLoggedIn failed");
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    function checkAdmin ($q, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.isAdmin)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    }

    function checkCurrentUser ($q, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    }

})();
