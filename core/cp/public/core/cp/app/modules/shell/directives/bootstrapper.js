define([
        'modules/shell/directives/toggleSubmenu', 
        'modules/shell/directives/toggleSidebar', 
        'modules/shell/directives/sidebarMenu',
        'modules/shell/directives/sidebarMenuItem'],
    function (toggleSubmenu, toggleSidebar, sidebarMenu, sidebarMenuItem) {
        var directives = angular.module('shell.directives', []);
        directives.directive('toggleSubmenu', toggleSubmenu); 
        directives.directive('toggleSidebar', toggleSidebar);
        directives.directive('sidebarMenuItem', ['$compile', sidebarMenuItem]);
        directives.directive('sidebarMenu', ['$compile', sidebarMenu]);
        
});