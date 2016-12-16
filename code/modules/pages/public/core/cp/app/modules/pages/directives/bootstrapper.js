define([
        'modules/pages/directives/editingField'
        ],
    function (editingField) {
        var directives = angular.module('pages.directives', []);
        directives.directive('editingField', editingField);
});