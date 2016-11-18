/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function d($compile){
        return {
            restrict: 'E', 
            replace: true,  
            scope: {
                itemClick : '&'
            },    
            link: function(scope, element, attr) {               
            },
            template: '<div><ul class="main-menu"><sidebar-menu-item ng-repeat="item in menus" item="item"></sidebar-menu-item></ul><div>',            
            controller:  function ($scope, $rootScope) {
                if(window.spa && window.spa.menus){
                    $rootScope.depth = 0;
                    $scope.menus = window.spa.menus;

                    console.log($scope.itemClick);

                    this.sidebarStat = function(event){
                        $scope.itemClick(event);
                        console.log(event);
                    }    
                }
            }
        };       
    }

    return d;
});