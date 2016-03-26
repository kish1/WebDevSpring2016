/**
 * Created by kishore on 3/11/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $rootScope, $location, $sce) {
        $scope.videoId = $location.search().videoId;
        //console.log($rootScope.index);

        $scope.title = $rootScope.results[$rootScope.index].snippet.title;
        $scope.description = $rootScope.results[$rootScope.index].snippet.description;
        $scope.channelTitle = $rootScope.results[$rootScope.index].snippet.channelTitle;
        $scope.url="http://youtube.com/embed/" + $scope.videoId;
        $scope.trust = trust;


        console.log($scope.url);


        console.log($scope.title);

        $scope.$apply;

        function trust(url) {
            return $sce.trustAsResourceUrl(url);
        }
    }
})();
