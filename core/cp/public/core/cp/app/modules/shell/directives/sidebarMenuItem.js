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
                element.html('');
                if(angular.isArray(scope.item.childitems)){                   
                    element.attr('class', 'sub-menu')           
                    element.append('<a toggle-submenu><i class="zmdi zmdi-widgets"></i> {{item.text}}</a>');
                    element.append('<ul><sidebar-menu-item ng-repeat="childitem in item.childitems" item="childitem"></sidebar-menu-item></ul>');                    
                }else{
                    element.append('<a><i class="zmdi zmdi-widgets"></i> {{item.text}}</a>');
                }

                $compile(element.contents())(scope);

                console.log("treeview item directive loaded");
            },
            template: '<li data-ui-sref-active="active"></li>'
        };       
    }

    return d;
});