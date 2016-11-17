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
            link: function(scope, element, attr) {
                var iconClass = 'zmdi zmdi-folder zmdi-hc-fw';
                
                if(scope.item.iconClass){
                    iconClass = scope.item.iconClass;
                }

                element.removeAttr('data-ui-sref-active');

                var content = '';    

                if(angular.isArray(scope.item.menu)){
                    content+='<li data-ui-sref-active="active" class="sub-menu" data-ng-class="{ \'active toggled\': main.$state.includes(\'' + scope.item.state + '\') }">';
                    content+='  <a toggle-submenu><i class="' + iconClass + '"></i> {{item.title}}</a>';
                    content+='  <ul><sidebar-menu-item ng-repeat="childitem in item.menu" item="childitem"></sidebar-menu-item></ul>';
                    content+='</li>';                    
                }else{
                    content+='<li data-ui-sref-active="active">';
                    content+='  <a data-ui-sref="' + scope.item.state + '" ng-click="main.sidebarStat($event)"><i class="' + iconClass + '"></i> {{item.title}}</a>';
                    content+='</li>';                    
                }

                var template = $compile(content)(scope); 
                
                element.replaceWith(template);              
            },
            template: '<li data-ui-sref-active="active"></li>'
        };       
    }

    return d;
});