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
                if(angular.isArray(scope.item.childitems)){
                    element.html('');
                    element.attr('class', 'sub-menu')           
                    element.append('<a toggle-submenu>{{item.text}}</a>');
                    element.append('<ul><sidebar-menu-item ng-repeat="childitem in item.childitems" item="childitem"></sidebar-menu-item></ul>');                    
                }else{
                    element.html('');
                    element.append('<a>{{item.text}}</a>');
                }

                $compile(element.contents())(scope);

                console.log("treeview item directive loaded");
            },
            template: '<li data-ui-sref-active="active"><a>{{item.text}}</a></li>'
        };       
    }

    return d;
});