define(['modules/pages/controllers/pages.ctrl'],
    function (pages) {
        angular.module('pages.controllers', [])
            .controller('pages.ctrl', ['$scope', pages]);
});