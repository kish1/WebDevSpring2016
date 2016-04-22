/**
 * Created by kishore on 4/3/16.
 */
(function() {
    angular
        .module("BlogApp")
        .controller("UserController", UserController);
    function UserController(UserService, FollowService, PostService, StarService ,$routeParams, $location, $q, $sce, $uibModal, $log) {
        var vm = this;
        vm.pageOwnerHandle = null;
        vm.pageOwner = null;
        vm.currentUser = null;
        vm.isHomePage = false;
        vm.isFollowing = false;
        vm.dp = "/project/images/default.jpg";
        vm.postCount = 2;
        vm.lastNPosts = null;

        vm.follow = follow;
        vm.unfollow = unfollow;
        vm.readPost = readPost;
        vm.trust = trust;
        vm.findFollowers = findFollowers;
        vm.findFollowing = findFollowing;
        vm.findStarred = findStarred;
        vm.allPosts = allPosts;

        function init() {
            vm.pageOwnerHandle = $routeParams.userHandle;
            UserService
                .findUserByHandle(vm.pageOwnerHandle)
                .then(function (resp) {
                    vm.pageOwner = resp.data;
                    vm.dp = imageUrl(vm.pageOwner.displayPicture);

                    PostService
                        .findLastPostsForUser(vm.pageOwner._id, vm.postCount)
                        .then(function (resp) {
                            //vm.lastNPosts = JSON.parse(JSON.stringify(resp.data))
                            vm.lastNPosts = resp.data
                            console.log(vm.lastNPosts);
                            //var starCountDict = {};
                            var promises = vm.lastNPosts.map(function (x) {
                                return StarService.findStarCountForPost(x._id);
                            });
                            $q.all(promises)
                                .then(
                                    function (resp) {

                                        var result = resp.map(function (x) { return x.data[0]});
                                        console.log(result);
                                        for(var i in result) {
                                            vm.lastNPosts[i].createdOn = new Date(vm.lastNPosts[i].createdOn);
                                            vm.lastNPosts[i].starrersCount = result[i].starrersCount;

                                           // starCountDict[result[i]._id] = result[i].starrersCount;
                                        }
                                        //console.log(vm.lastNPosts);
                                    },
                                    function (err) {
                                        console.log(err);
                                    }
                                );
                            /*
                            for(var i in vm.lastNPosts) {
                                vm.lastNPosts[i].starrersCount = starCountDict[vm.lastNPosts[i]._id];
                            }*/
                            console.log(vm.lastNPosts);

                        });

                    UserService
                        .getCurrentUser()
                        .then(function (resp) {
                            vm.currentUser = resp.data;
                            //console.log("here");
                            if (vm.currentUser != '0') {
                                if (vm.currentUser.handle == vm.pageOwnerHandle) {
                                    vm.isHomePage = true;
                                } else {

                                    FollowService
                                        .checkFollows(vm.currentUser._id, vm.pageOwner._id)
                                        .then(function (resp) {
                                            if (resp.data) {
                                                vm.isFollowing = true;
                                            }
                                        });
                                }
                            }
                        });
                });
        }
        init();

        function allPosts() {
            $location.path("/post/" + vm.pageOwner.handle);
        }

        function follow() {
            FollowService
                .createFollowing(vm.currentUser._id, vm.pageOwner._id)
                .then(
                    function (resp) {
                        vm.isFollowing = true;
                    },
                    function (err) {

                    });
        }

        function unfollow() {
            FollowService
                .deleteFollowing(vm.currentUser._id, vm.pageOwner._id)
                .then(
                    function (resp) {
                        vm.isFollowing = false;
                    },
                    function (err) {
                        console.log("err");
                    });
        }

        function readPost(postId) {
            $location.search("postId", postId).path("/readpost");
        }

        function trust(videoId) {
            return $sce.trustAsResourceUrl("http://youtube.com/embed/" + videoId);
        }

        function imageUrl(imageName) {
            return "http://" + location.host + "/project/server/images/dp/" + imageName;
        }

        function findFollowers() {
            launchModal('md', followersModalController, vm.pageOwner._id);
        }

        function findFollowing() {
            launchModal('md', followingModalController, vm.pageOwner._id);
        }

        function findStarred() {
            launchModal('md', starredModalController, vm.pageOwner._id);
        }

        function launchModal(size, givenController, userId) {
            //console.log("reached");

            var modalInstance = $uibModal.open({
                animation: true,//$scope.animationsEnabled,
                templateUrl: 'views/modals/list.modal.view.html',
                controller: givenController,
                size: size,
                resolve: {
                    userId: function () {
                        return userId;
                    }
                }
            });

            modalInstance.result.then(function(){}, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function starredModalController($scope, $uibModalInstance, userId) {
            $scope.query = null;
            $scope.results = [];
            $scope.heading = "Starred by ";
            $scope.hasPic = false;
            $scope.prev = false;
            $scope.next = false;
            $scope.total = null;
            $scope.current = 0;
            $scope.count = 5;



            $scope.fetchNext = fetchNext;
            $scope.fetchPrev = fetchPrev;
            $scope.select = select;

            var init = function () {
                $scope.total = vm.pageOwner.starredCount;
                $scope.heading += vm.pageOwner.firstName + " " + vm.pageOwner.lastName;

                $scope.fetchNext();
            };
            init();

            function makeContent() {
                console.log($scope.results);
                var promises = $scope.results.map(function(x) { return PostService.findPostById(x)});
                var news = [];
                $q.all(promises)
                    .then(function (resp) {
                        console.log(resp);
                        news = resp.map(function(x) {return x.data;});
                        console.log(news);
                        $scope.results = news.map(function(x) {x.content = x.name; return x;});
                        //console.log($scope.results);
                    });
            }

            function fetchNext() {
                StarService
                    .findStarsForUser(userId, $scope.current, $scope.count)
                    .then(function (resp) {
                        //console.log(resp);
                        $scope.results = resp.data.starred;
                        $scope.current += $scope.count;
                        if ($scope.current - $scope.count > 0) {
                            $scope.prev = true;
                        } else {
                            $scope.prev = false;
                        }

                        if ($scope.current <= $scope.total) {
                            $scope.next = true;
                        } else {
                            $scope.next = false;
                        }

                        makeContent();
                    });
            }

            function fetchPrev() {
                StarService
                    .findStarsForUser(userId, $scope.current - $scope.count, $scope.count)
                    .then(function (resp) {
                        $scope.results = resp.data.starred;
                        $scope.current -= $scope.count;
                        if ($scope.current - $scope.count > 0) {
                            $scope.prev = true;
                        } else {
                            $scope.prev = false;
                        }

                        if ($scope.current <= $scope.total) {
                            $scope.next = true;
                        } else {
                            $scope.next = false;
                        }

                        makeContent();
                    });
            }

            function select(val) {
                $uibModalInstance.close();
                $location.search("postId", val._id).path("/readpost");
            }
        }


        function followingModalController($scope, $uibModalInstance, userId) {
            $scope.query = null;
            $scope.results = [];
            $scope.heading = "Followed by ";
            $scope.hasPic = true;
            $scope.prev = false;
            $scope.next = false;
            $scope.total = null;
            $scope.current = 0;
            $scope.count = 5;
            $scope.defaultImage = "/project/images/default.jpg";


            $scope.fetchNext = fetchNext;
            $scope.fetchPrev = fetchPrev;
            $scope.select = select;
            $scope.pic = pic;

            var init = function () {
                $scope.total = vm.pageOwner.followingCount;
                $scope.heading += vm.pageOwner.firstName + " " + vm.pageOwner.lastName;

                $scope.fetchNext();
            };
            init();

            function pic(result) {
                return imageUrl(result.displayPicture? result.displayPicture : $scope.defaultImage);
            }

            function makeContent() {
                var promises = $scope.results.map(function(x) { return UserService.findNameByUserId(x)});
                var news = [];
                $q.all(promises)
                    .then(function (resp) {
                        //console.log(resp);
                        news = resp.map(function(x) {return x.data;});
                        //console.log(news);
                        $scope.results = news.map(function(x) {x.content = x.firstName + " " + x.lastName; return x;});
                        //console.log($scope.results);
                    });
            }

            function fetchNext() {
                FollowService
                    .findFollowingForUser(userId, $scope.current, $scope.count)
                    .then(function (resp) {
                        console.log(resp);
                        $scope.results = resp.data.following;
                        $scope.current += $scope.count;
                        if ($scope.current - $scope.count > 0) {
                            $scope.prev = true;
                        } else {
                            $scope.prev = false;
                        }

                        if ($scope.current <= $scope.total) {
                            $scope.next = true;
                        } else {
                            $scope.next = false;
                        }

                        makeContent();
                    });
            }

            function fetchPrev() {
                FollowService
                    .findFollowingForUser(userId, $scope.current - $scope.count, $scope.count)
                    .then(function (resp) {
                        $scope.results = resp.data.following;
                        $scope.current -= $scope.count;
                        if ($scope.current - $scope.count > 0) {
                            $scope.prev = true;
                        } else {
                            $scope.prev = false;
                        }

                        if ($scope.current <= $scope.total) {
                            $scope.next = true;
                        } else {
                            $scope.next = false;
                        }

                        makeContent();
                    });
            }

            function select(val) {
                $uibModalInstance.close();
                $location.path("/user/" + val.handle);
            }
        }

        function followersModalController($scope, $uibModalInstance, userId) {
            $scope.query = null;
            $scope.results = [];
            $scope.heading = "Followers of ";
            $scope.hasPic = true;
            $scope.prev = false;
            $scope.next = false;
            $scope.total = null;
            $scope.current = 0;
            $scope.count = 5;
            $scope.defaultImage = "/project/images/default.jpg";

            $scope.fetchNext = fetchNext;
            $scope.fetchPrev = fetchPrev;
            $scope.select = select;
            $scope.pic = pic;

            var init = function () {
                $scope.total = vm.pageOwner.followersCount;
                $scope.heading += vm.pageOwner.firstName + " " + vm.pageOwner.lastName;

                $scope.fetchNext();
            };
            init();

            function pic(result) {

                return imageUrl(result.displayPicture? result.displayPicture : $scope.defaultImage);
            }

            function makeContent() {
                var promises = $scope.results.map(function(x) { return UserService.findNameByUserId(x)});
                var news = [];
                $q.all(promises)
                    .then(function (resp) {
                        //console.log(resp);
                        news = resp.map(function(x) {return x.data;});
                        //console.log(news);
                        $scope.results = news.map(function(x) {x.content = x.firstName + " " + x.lastName; return x;});
                        console.log($scope.results);
                    });
            }

            function fetchNext() {
                FollowService
                    .findFollowersForUser(userId, $scope.current, $scope.count)
                    .then(function (resp) {
                        $scope.results = resp.data.followers;
                        $scope.current += $scope.count;
                        if ($scope.current - $scope.count > 0) {
                            $scope.prev = true;
                        } else {
                            $scope.prev = false;
                        }

                        if ($scope.current <= $scope.total) {
                            $scope.next = true;
                        } else {
                            $scope.next = false;
                        }

                        makeContent();
                    });
            }

            function fetchPrev() {
                FollowService
                    .findFollowersForUser(userId, $scope.current - $scope.count, $scope.count)
                    .then(function (resp) {
                        $scope.results = resp.data.followers;
                        $scope.current -= $scope.count;
                        if ($scope.current - $scope.count > 0) {
                            $scope.prev = true;
                        } else {
                            $scope.prev = false;
                        }

                        if ($scope.current <= $scope.total) {
                            $scope.next = true;
                        } else {
                            $scope.next = false;
                        }

                        makeContent();
                    });
            }

            function select(val) {
                $uibModalInstance.close();
                $location.path("/user/" + val.handle);
            }
        }

    }

})();
