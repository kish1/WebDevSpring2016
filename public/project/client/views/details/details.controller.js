/**
 * Created by kishore on 3/11/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $rootScope, $location) {
        $scope.videoId = $location.search().videoId;
        //console.log($rootScope.index);

        $scope.title = $rootScope.results[$rootScope.index].snippet.title;
        $scope.description = $rootScope.results[$rootScope.index].snippet.description;
        $scope.channelTitle = $rootScope.results[$rootScope.index].snippet.channelTitle;

        console.log($scope.title);

        $scope.$apply;
    }
})();
