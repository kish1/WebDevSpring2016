(function () {
    angular
        .module("BlogApp")
        .controller("PostsController", PostsController);

    function PostsController(PostService) {
        var vm = this;

        vm.today = getToday();
        vm.post = {createdOn: getToday()};
        vm.posts = null;
        vm.message = null;
        vm.index = null;

        vm.addPost = addPost;
        vm.updatePost = updatePost;
        vm.selectPost = selectPost;
        vm.deletePost = deletePost;

        var init = function() {
            PostService
                .findAllPosts()
                .then(function(response) {
                    vm.posts = response.data;
                    //console.log(vm.posts);
                    for(var i in vm.posts) {
                        vm.posts[i].createdOn = new Date(vm.posts[i].createdOn[0], vm.posts[i].createdOn[1], vm.posts[i].createdOn[2]);
                    }
                });
        };
        init();

        function addPost(post) {
            vm.message = null;
            post.tags = post.tags.split(" ");
            PostService
                .createPost(post.userId, post)
                .then(
                    function (response) {
                        var newPost = response.data;
                        newPost.createdOn = new Date(newPost.createdOn[0], newPost.createdOn[1], newPost.createdOn[2]);
                        vm.posts.push(newPost);
                        vm.post = {createdOn: getToday()};
                    },
                    function (err) {
                        console.log(JSON.parse(JSON.stringify(err)));
                        vm.message = "Could not add post";
                    }
                );
        }

        function updatePost(post) {
            vm.message = null;
            post.tags = post.tags.split(",");
            console.log((post));
            PostService
                .updatePostById(post._id, post)
                .then(
                    function(response) {
                        vm.posts[vm.index] = response.data;
                        vm.post = {createdOn: getToday()};
                        vm.index = null;
                },
                function (err) {
                    vm.message = "Could not add post";
                });
        }

        function selectPost(index) {
            vm.post = {
                _id:       vm.posts[index]._id,
                userId:    vm.posts[index].userId,
                name:      vm.posts[index].name,
                tags:      vm.posts[index].tags.join(","),
                createdOn: vm.posts[index].createdOn,
            };
            vm.index = index;
        }

        function deletePost(index) {
            PostService.deletePostById(vm.posts[index]._id)
                .then(function(response) {
                    vm.posts = response.data;
                    console.log(vm.posts);
                    for(var i in vm.posts) {
                        vm.posts[i].createdOn = new Date(vm.posts[i].createdOn[0], vm.posts[i].createdOn[1], vm.posts[i].createdOn[2]);
                    }
                });
        }

        function getToday() {
            //return new Date().toISOString().substring(0, 10);
            return new Date();
        }
    }
})();