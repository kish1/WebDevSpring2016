(function () {
    angular
        .module("BlogApp")
        .controller("PostsController", PostsController);

    function PostsController(PostService) {
        var vm = this;

        vm.today = getToday();
        vm.post = {createdOn: getToday()};
        vm.posts = null;

        vm.addPost = addPost;
        vm.updatePost = updatePost;
        vm.selectPost = selectPost;
        vm.deletePost = deletePost;

        var init = function() {
            PostService.findAllPosts()
                .then(function(response) {
                    vm.posts = response.data;
                    console.log(vm.posts);
                    for(var i in vm.posts) {
                        vm.posts[i].createdOn = new Date(vm.posts[i].createdOn[0], vm.posts[i].createdOn[1], vm.posts[i].createdOn[2]);
                    }
                });
        };
        init();

        function addPost(post) {
            post.content = [post.content];
            PostService.createPost(post.userId, post)
                .then(function(response) {
                    var newPost = response.data;
                    newPost.createdOn = new Date(newPost.createdOn[0], newPost.createdOn[1], newPost.createdOn[2]);
                    vm.posts.push(newPost);
                    vm.post = {createdOn: getToday()};
                });
        }

        function updatePost(post) {
            post.content = [post.content];
            PostService.updatePostById(post._id, post)
                .then(function(response) {
                    var newPost = response.data;
                    newPost.createdOn = new Date(newPost.createdOn[0], newPost.createdOn[1], newPost.createdOn[2]);
                    for(var i in vm.posts) {
                        if (vm.posts[i]._id == post._id) {
                            vm.posts[i] = newPost;
                            break;
                        }
                    }
                    vm.post = {createdOn: getToday()};
                });

        }

        function selectPost(index) {
            vm.post = {
                _id:       vm.posts[index]._id,
                userId:    vm.posts[index].userId,
                name:      vm.posts[index].name,
                createdOn: vm.posts[index].createdOn,
                content:   vm.posts[index].content[0]
            };
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