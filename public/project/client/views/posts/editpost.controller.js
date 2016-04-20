/**
 * Created by kishore on 4/7/16.
 */
(function() {
    angular
        .module("BlogApp")
        .controller("EditpostController", EditpostController);

    function EditpostController($sce, $location, $uibModal, $log, UserService, PostService) {
        var vm = this;
        vm.postId = null;
        vm.post = {
            name: "",
            content: []
        };
        vm.currentUser = null;
        vm.text = "";
        vm.textIndex = null;
        vm.videoIndex = null;

        vm.trust = trust;
        vm.addText = addText;
        vm.addVideo = addVideo;

        vm.updateText = updateText;
        vm.editText = editText;
        vm.editVideo = editVideo;
        vm.removeText = removeText;
        vm.removeVideo = removeVideo;

        vm.updatePost = updatePost;
(function() {
    for(var i in users) {
        var d = users[i].dob;
        users[i].dob = new Date(d[0], d[1], d[2]);
    }
    //console.log(users);
})();
        var init = function () {

            UserService
                .getCurrentUser()
                .then(
                    function (resp) {
                        vm.currentUser = resp.data;
                        if (!vm.currentUser) {
                            $location.url("/login");
                            return;
                        }

                        vm.postId = $location.search().postId;
                        console.log(vm.postId);
                        PostService.findPostById(vm.postId)
                            .then(function (response) {
                                if (response.data) {
                                    vm.post = response.data;
                                    console.log(vm.post);
                                }
                            });
                    }
                );


        };
        init();

        function updatePost(post) {
            post.tags = post.tags.split(" ");
            post.content = post.content.map(function(x) {return {type: x.type, value: x.value};});
            PostService.updatePostById(post._id, post)
                .then(function (response) {
                    $location.path("/post");
                });
        }

        function updateText(text) {
            vm.post.content[vm.textIndex].value = text;
            vm.textIndex = null;
            vm.text = null;
        }

        function removeText($index) {
            vm.post.content.splice($index, 1);
        }

        function removeVideo($index) {
            vm.post.content.splice($index, 1);
        }

        function editText($index) {
            vm.textIndex = $index;
            vm.text = vm.post.content[vm.textIndex].value;
        }

        function editVideo($index) {
            vm.videoIndex = $index;
            launchSearchModal('lg', updateVideo);
        }

        function updateVideo(videoId) {
            vm.post.content[vm.videoIndex].value = videoId;
            vm.videoIndex = null;
        }

        function addText(text) {
            console.log("Here");
            var newPart = {
                type: "text",
                value: text
            };
            vm.post.content.push(newPart);
            vm.text = "";
        }

        function trust(videoId) {
            //console.log(videoId);
            return $sce.trustAsResourceUrl("http://youtube.com/embed/" + videoId);
        }

        function addVideo() {
            launchSearchModal('lg', insertVideo);
        }

        function insertVideo(videoId) {
            //console.log(videoId);
            var newVideo = {
                type: "video",
                value: videoId
            };
            vm.post.content.push(newVideo);
        }


        function launchSearchModal(size, someFunction) {
            //console.log("reached");

            var modalInstance = $uibModal.open({
                animation: true,//$scope.animationsEnabled,
                templateUrl: 'views/modals/search.modal.view.html',
                controller: modalController,
                size: size,
                resolve: {
                    items: function () {
                        return;
                    }
                }
            });

            modalInstance.result.then(someFunction, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }


        function modalController($scope, $uibModalInstance) {
            $scope.query = null;
            $scope.results = [];
            $scope.prev = null;
            $scope.next = null;


            $scope.ok = ok;
            $scope.search = search;

            function ok(videoId) {
                //console.log($scope.selected);
                $uibModalInstance.close(videoId);
            };

            function cancel() {
                $uibModalInstance.dismiss('cancel');
            };

            function search(query, token) {
                var request = gapi.client.youtube.search.list({
                    part: "snippet",
                    type: "video",
                    q: encodeURIComponent(query).replace(/%20/g, "+"),
                    videoEmbeddable: true,
                    pageToken: token,
                    maxResults: 10,
                    order: "viewCount"
                });
                request.execute(function (response) {
                    $scope.results = response.items;
                    //$rootScope.results = response.items;
                    //console.log(response);
                    $scope.prev = response.result.prevPageToken;
                    $scope.next = response.result.nextPageToken;
                    $scope.$apply();
                });
            }


        }

    }
})();
