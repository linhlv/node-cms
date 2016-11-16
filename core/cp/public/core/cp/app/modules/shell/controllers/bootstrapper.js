define(['modules/shell/controllers/main'],
    function (main) {
        angular.module('shell.controllers', [])
            .controller('main', ['$scope', main]);
});