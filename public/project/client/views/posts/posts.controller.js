(function () {
    angular
        .module("BlogApp")
        .controller("PostsController", PostsController);

    function PostsController($scope, PostService) {
        $scope.post = {};
        $scope.posts = PostService.findAllPosts(identity);
        var d = new Date();
        $scope.today = d.toISOString().substring(0, 10);
        $scope.post = {createdOn: d};

        $scope.addPost = addPost;
        $scope.updatePost = updatePost;
        $scope.selectPost = selectPost;
        $scope.deletePost = deletePost;

        function addPost(post) {
            PostService.createPost(post, identity);
            $scope.post = {createdOn: d};
        }

        function updatePost(post) {
            PostService.updatePostById($scope.post._id, $scope.post, identity);
            $scope.post = {createdOn: d};
        }

        function selectPost(index) {
            $scope.post = {
                _id:       $scope.posts[index]._id,
                userId:    $scope.posts[index].userId,
                name:      $scope.posts[index].name,
                createdOn: $scope.posts[index].createdOn,
                content:   $scope.posts[index].content
            };
        }

        function deletePost(index) {
            PostService.deletePostById($scope.posts[index]._id, identity);
        }

        function identity(param) {
            return param;
        }
    }
})();