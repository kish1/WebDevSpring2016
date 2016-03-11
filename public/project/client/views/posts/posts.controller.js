(function () {
    angular
        .module("BlogApp")
        .controller("PostsController", PostsController);

    function PostsController($scope, PostService) {
        $scope.today = getToday();
        $scope.post = {createdOn: getToday()};
        $scope.posts = PostService.findAllPosts(identity);

        $scope.addPost = addPost;
        $scope.updatePost = updatePost;
        $scope.selectPost = selectPost;
        $scope.deletePost = deletePost;

        function addPost(post) {
            PostService.createPost(post, identity);
            $scope.post = {createdOn: getToday()};
        }

        function updatePost(post) {
            PostService.updatePostById(post._id, post, identity);
            $scope.post = {createdOn: getToday()};
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

        function getToday() {
            return new Date().toISOString().substring(0, 10);
        }

        function identity(param) {
            return param;
        }
    }
})();