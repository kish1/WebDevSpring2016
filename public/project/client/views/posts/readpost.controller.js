/**
 * Created by kishore on 3/25/16.
 */
"use strict";
(function() {
    angular
        .module("BlogApp")
        .controller("ReadpostController", ReadpostController);

    function ReadpostController($q, $location, $sce, $uibModal, $log, PostService, UserService, CommentService, StarService) {
        var vm = this;

        vm.currentUser = null;
        vm.postId = null;
        vm.post = null;
        vm.postOwnerName = null;
        vm.comments = null;
        vm.comment = {};
        vm.message = null;
        vm.isOwnPost = false;
        vm.hasStarred = false;
        vm.starrersCount = 0;
        
        vm.addComment = addComment;
        vm.isOwnerOrCommenter = isOwnerOrCommenter;
        vm.removeComment = removeComment;
        vm.postOwner = postOwner;
        vm.editPost = editPost;
        vm.trust = trust;
        vm.findStarrers = findStarrers;
        vm.clickStar = clickStar;
        vm.imageUrl = imageUrl;

        var init = function() {
            vm.postId = $location.search().postId;

            PostService.findPostById(vm.postId)
                .then(function(response) {
                    console.log(response);
                    vm.post = response.data;
                    vm.post.createdOn = new Date(vm.post.createdOn);
                    vm.starrersCount = vm.post.starrersCount;
                    //console.log(vm.post);

                    UserService.findNameByUserId(vm.post.userId)
                        .then(function (response) {
                            var data = response.data;
                            vm.postOwnerName = data.firstName + " " + data.lastName;
                            vm.postOwnerHandle = data.handle;
                            vm.postOwnerDP = imageUrl(data.displayPicture);
                        });

                    UserService
                        .getCurrentUser()
                        .then(function (resp) {
                            vm.currentUser = resp.data;
                            if (vm.currentUser == '0') {
                                vm.currentUser = null;
                            } else {
                                if (vm.currentUser._id == vm.post.userId) {
                                    vm.isOwnPost = true;
                                }
                                StarService
                                    .checkStarred(vm.currentUser._id, vm.postId)
                                    .then(function (resp) {
                                        if (resp.data) {
                                            vm.hasStarred = true;
                                        }
                                    })
                            }
                        });

                    CommentService.findAllCommentsForPost(vm.postId)
                        .then(function(response) {
                            vm.comments = response.data;

                            var promises = vm.comments.map(function (x) {
                                return UserService.findNameByUserId(x.userId);
                            });

                            var userDetailsMap = {};
                            $q.all(promises)
                                .then(function(resp) {
                                    console.log(resp);
                                    var names = resp.map(function(x){return x.data;});
                                    for(var i in names) {
                                        userDetailsMap[names[i]._id] = names[i];
                                    }
                                    console.log(userDetailsMap);
                                    for(var i in vm.comments) {
                                        vm.comments[i].timestamp = new Date(vm.comments[i].timestamp);
                                        var userDetails = userDetailsMap[vm.comments[i].userId];
                                        vm.comments[i].firstName = userDetails.firstName;
                                        vm.comments[i].lastName = userDetails.lastName;
                                        vm.comments[i].displayPicture = userDetails.displayPicture;
                                        vm.comments[i].handle = userDetails.handle;
                                    }
                                    console.log(vm.comments);
                                });


                        });
                });
        };
        init();

        function findStarrers() {
            launchModal('md', starrersModalController, vm.postId);
        }

        function clickStar() {
            if (vm.hasStarred) {
                unstar();
            } else {
                star();
            }
        }

        function star() {
            StarService
                .createStar(vm.currentUser._id, vm.postId)
                .then(function (resp) {
                    vm.hasStarred = true;
                    vm.starrersCount += 1;
                });
        }

        function unstar() {
            StarService
                .deleteStar(vm.currentUser._id, vm.postId)
                .then(function (resp) {
                    vm.hasStarred = false;
                    vm.starrersCount -= 1;
                });
        }



        function trust(videoId) {
            return $sce.trustAsResourceUrl("http://youtube.com/embed/" + videoId);
        }

        function editPost() {
            $location.search("postId", vm.post._id).path("/editpost");
        }

        function postOwner() {
            $location.search("postId", null).path("/user/" + vm.postOwnerHandle);
        }

        function removeComment(commentId,$index) {
            CommentService.deleteCommentById(commentId)
                .then(function(response) {
                    vm.comments.splice($index, 1);
                })
        }

        function addComment(comment) {
            console.log("Add");
            if(!vm.currentUser) {
                vm.message = "Please login to leave a comment";
                return;
            }

            var newComment = {
                userId: vm.currentUser._id,
                postId: vm.postId,
                timestamp: new Date(),
                content: comment.content
            };
            CommentService.createComment(newComment)
                .then(function(response) {
                    var comm = response.data;
                    comm.firstName = vm.currentUser.firstName;
                    comm.lastName = vm.currentUser.lastName;
                    vm.comments.push(comm);
                    vm.comment = {};
                });
        }

        function isOwnerOrCommenter(userId) {
            return (vm.currentUser != null) && (vm.isOwnPost || (userId == vm.currentUser._id));
        }

        function imageUrl(imageName) {
            if (imageName) {
                return "http://" +  location.host +  "/images/dp/" + imageName;
            }
            return "/project/images/default.jpg";
        }

        function launchModal(size, givenController, postId) {
            //console.log("reached");

            var modalInstance = $uibModal.open({
                animation: true,//$scope.animationsEnabled,
                templateUrl: 'views/modals/list.modal.view.html',
                controller: givenController,
                size: size,
                resolve: {
                    postId: function () {
                        return postId;
                    }
                }
            });

            modalInstance.result.then(function(){}, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function starrersModalController($scope, $uibModalInstance, postId) {
            $scope.query = null;
            $scope.results = [];
            $scope.heading = "Starrers of ";
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
                $scope.total = vm.postOwner.starrersCount;
                $scope.heading += vm.post.name;

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
                StarService
                    .findStarsForPost(postId, $scope.current, $scope.count)
                    .then(function (resp) {
                        console.log(resp);
                        $scope.results = resp.data.starrers;
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
                    .findStarsForPost(userId, $scope.current - $scope.count, $scope.count)
                    .then(function (resp) {
                        $scope.results = resp.data.starrers;
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
