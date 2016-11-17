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
                scope.$watch('item.childitems', function() {                                      
                    element.append($compile('<ul><sidebar-menu-item ng-repeat="childitem in item.childitems" item="childitem"></sidebar-menu-item></ul>')(scope));                    
                });
                console.log("treeview item directive loaded");
            },
            template: '<li><i class="icon-plus-sign"></i><a href="/"><i class="icon-folder-close"></i>{{item.text}}</a></li>'
        };       
    }

    return d;
});