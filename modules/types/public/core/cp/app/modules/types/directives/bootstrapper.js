define([
        'modules/types/directives/fieldsEditor',
        'modules/types/directives/basicTypeInfo'],
    function (fieldsEditor, basicTypeInfo) {
        var directives = angular.module('types.directives', []);
        directives.directive('fieldsEditor', fieldsEditor);
        directives.directive('basicTypeInfo', basicTypeInfo);
});