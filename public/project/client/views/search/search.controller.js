/**
 * Created by kishore on 3/11/16.
 */
"use strict";
(function () {
    angular
        .module("BlogApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $rootScope, $location) {
        $scope.results = [];
        $scope.search = search;
        $scope.details = details;
        $scope.searched = false;
        $scope.next = null;
        $scope.previous = null;

        //console.log(Object.prototype.toString([]));

        function search(query, token) {
            $scope.searched = true;
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
                $rootScope.results = response.items;
                $scope.previous = response.result.prevPageToken;
                $scope.next = response.result.nextPageToken;
                console.log(response);
                console.log($scope.previous);
                console.log($scope.next);
                $scope.$apply();
            });
        }

        function details(index, vId) {
            console.log(vId);
            $location.search("videoId",vId).path("/details");
            $rootScope.index = index;
        }
    }
})();
