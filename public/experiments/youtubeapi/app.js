/**
 * Created by kishore on 3/5/16.
 */
"use strict";

(function () {
    angular
        .module("APITest", [])
        .controller("SearchController", SearchController);

    function SearchController($scope) {
        $scope.search = search;
        //$scope.clientReady = clientReady();
        $scope.results = [];
        console.log("Hello");

        function search(query) {
            var request = gapi.client.youtube.search.list({
                part: "snippet",
                type: "video",
                q: encodeURIComponent(query).replace(/%20/g, "+"),
                maxResults: 10,
                order: "viewCount"
            });
            request.execute(function (response) {
                console.log(response);
            })
        }
    }
})();


