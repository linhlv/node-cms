/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function d($compile){
        return {
            restrict: 'E',   
            transclude: true,   
            replace: true,  
            scope: {},    
            link: function(scope, element, attr) {               
            },
            template: '<ul class="main-menu"><sidebar-menu-item ng-repeat="item in menus" item="item"></sidebar-menu-item></ul>',            
            controller:  function ($scope, $rootScope) {
                if(window.spa && window.spa.menus){
                    $rootScope.depth = 0;
                    $scope.menus = window.spa.menus;    
                }
            }
        };       
    }

    return d;
});