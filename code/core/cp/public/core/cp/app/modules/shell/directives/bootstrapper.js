define([
        'modules/shell/directives/profile',
        'modules/shell/directives/topMenu',        
        'modules/shell/directives/sidebarMenu',
        'modules/shell/directives/sidebarMenuItem'],
    function (profile, topMenu, sidebarMenu, sidebarMenuItem) {
        var directives = angular.module('shell.directives', []);
        directives.directive('profile', profile); 
        directives.directive('topMenu', topMenu);
        directives.directive('sidebarMenuItem', ['$compile', sidebarMenuItem]);
        directives.directive('sidebarMenu', ['$compile', sidebarMenu]);
        
});