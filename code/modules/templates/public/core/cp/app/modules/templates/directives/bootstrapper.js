define([
        'modules/templates/directives/fieldsEditor',
        'modules/templates/directives/basicTypeInfo'],
    function (fieldsEditor, basicTypeInfo) {
        var directives = angular.module('templates.directives', []);
        directives.directive('fieldsEditor', fieldsEditor);
        directives.directive('basicTypeInfo', basicTypeInfo);
});