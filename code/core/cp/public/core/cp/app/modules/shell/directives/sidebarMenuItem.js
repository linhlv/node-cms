/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function d($compile){
        return {
            restrict: 'E',   
            replace: true,
            scope: {
                item: "="
            },        
            require: '^sidebarMenu',            
            compile: function(tElement, tAttr) {
                var iconClass = 'zmdi zmdi-folder zmdi-hc-fw';    
                return function(scope, iElement, iAttr, sidebarMenu){                    
                    if(scope.item.iconClass){
                        iconClass = scope.item.iconClass;
                    }

                    iElement.removeAttr('data-ui-sref-active');

                    var template = '';    

                    if(angular.isArray(scope.item.menu)){
                        template+='<li data-ui-sref-active="active" class="sub-menu" data-ng-class="{ \'active toggled\': includes(\'' + scope.item.state + '\') }">';
                        template+='  <a toggle-submenu><i class="' + iconClass + '"></i> {{item.title}}</a>';
                        template+='  <ul><sidebar-menu-item ng-repeat="childitem in item.menu" item="childitem"></sidebar-menu-item></ul>';
                        template+='</li>';                    
                    }else{
                        template+='<li data-ui-sref-active="active">';
                        template+='  <a data-ui-sref="' + scope.item.state + '" data-ng-click="sidebarStat($event)"><i class="' + iconClass + '"></i> {{item.title}}</a>';
                        template+='</li>';                    
                    }

                    var newElement = angular.element(template);
                    
                    scope.includes = sidebarMenu.includes;
                    scope.sidebarStat = sidebarMenu.sidebarStat;

                    $compile(newElement)(scope); 
                    
                    iElement.replaceWith(newElement);
                };         
            },
            template: '<li data-ui-sref-active="active"></li>'
        };       
    }

    return d;
});