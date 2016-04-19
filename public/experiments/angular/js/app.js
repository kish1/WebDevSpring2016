/**
 * Created by kishore on 2/29/16.
 */
(function (){
    angular
        .module("SomeDBApp", ['ngAnimate', 'ui.bootstrap'])
        .controller("SomeController", SomeController);

    function SomeController($http) {
        //console.log("Hello World!");
        var vm = this;
        var players = [
        {"name":"Messi", "club":"Barcelona", "country":"Argentina"},
        {"name":"Cruyff", "club":"Ajax", "country":"Holland"}
            ];

        vm.players = players;
        vm.myfile = null;

        vm.addPlayer = addPlayer;
        vm.selectPlayer = selectPlayer;
        vm.updatePlayer = updatePlayer;
        vm.removePlayer = removePlayer;

        vm.upload = upload;

        function upload(data) {
            var fd = new FormData();
            for(var i in data) {
                fd.append(i, data[i]);
            }
            fd.append("myFile", data);
            fd.append("userId", "1234");
            $http.post("/api/project/user/img", fd, {
                transformRequest: angular.identity,
                headers: {"Content-Type": undefined}
            });
        }

        function addPlayer (player) {
        //console.log("Add player:" + vm.name);
        var newPlayer =
        {"name":player.name, "club":player.club, "country":player.country};
        vm.player = {};
        vm.players.push(newPlayer);
        }

        function selectPlayer (player) {
            vm.selectedPlayer = vm.players.indexOf(player);
            vm.player = {
                "name": player.name,
                "country": player.country,
                "club": player.club
            }
        }

        function updatePlayer (player) {
            vm.players[vm.selectedPlayer] = {
                "name": player.name,
                "country": player.country,
                "club": player.club
            }
            vm.player = {};
        }

        function removePlayer (player) {
            var index = vm.players.indexOf(player);
            vm.players.splice(index, 1);
        }

    }
})();
