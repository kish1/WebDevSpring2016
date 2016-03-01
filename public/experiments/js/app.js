/**
 * Created by kishore on 2/29/16.
 */
(function (){
    angular
        .module("SomeDBApp", [])
        .controller("SomeController", SomeController);

    function SomeController($scope) {
        //console.log("Hello World!");
        var players = [
        {"name":"Messi", "club":"Barcelona", "country":"Argentina"},
        {"name":"Cruyff", "club":"Ajax", "country":"Holland"}
            ];

        $scope.players = players;

        $scope.addPlayer = addPlayer;
        $scope.selectPlayer = selectPlayer;
        $scope.updatePlayer = updatePlayer;
        $scope.removePlayer = removePlayer;

        function addPlayer (player) {
        //console.log("Add player:" + $scope.name);
        var newPlayer =
        {"name":player.name, "club":player.club, "country":player.country};
        $scope.player = {};
        $scope.players.push(newPlayer);
        }

        function selectPlayer (player) {
            $scope.selectedPlayer = $scope.players.indexOf(player);
            $scope.player = {
                "name": player.name,
                "country": player.country,
                "club": player.club
            }
        }

        function updatePlayer (player) {
            $scope.players[$scope.selectedPlayer] = {
                "name": player.name,
                "country": player.country,
                "club": player.club
            }
            $scope.player = {};
        }

        function removePlayer (player) {
            var index = $scope.players.indexOf(player);
            $scope.players.splice(index, 1);
        }

    }
})();
