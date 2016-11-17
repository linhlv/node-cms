define(['modules/shell/directives/toggleSidebar', 
        'modules/shell/directives/sidebarMenu',
        'modules/shell/directives/sidebarMenuItem'],
    function (toggleSidebar, sidebarMenu, sidebarMenuItem) {
        var directives = angular.module('shell.directives', []); 
        directives.directive('toggleSidebar', toggleSidebar);
        directives.directive('sidebarMenuItem', ['$compile', sidebarMenuItem]);
        directives.directive('sidebarMenu', sidebarMenu);
        
});