define(['modules/shell/directives/toggleSidebar'],
    function (toggleSidebar) {
        var directives = angular.module('shell.directives', []); 
        directives.directive('toggleSidebar', toggleSidebar);
});