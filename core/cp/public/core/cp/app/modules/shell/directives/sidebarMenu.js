/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function d(){
        return {
            restrict: 'E',   
            transclude: true,   
            replace: true,  
            scope: {},    
            link: function(scope, element, attr) {
                console.log("treeview directive loaded");
            },
            template: '<div class="sl-treeview"><ul class="clear"><sidebar-menu-item ng-repeat="item in items" item="item"></sidebar-menu-item></ul></div>',            
            controller:  function ($scope, $rootScope) {
                $rootScope.depth = 0;
                $scope.items = [
                    { text: "face" },
                    { text: "palm" },
                    {
                        text: "cake",
                        childitems: [
                            { text: "1 face" },
                            { text: "1 palm", childitems: [
                                { text: "2 A"},
                                { text: "2 B"},
                                { text: "2 C"}
                            ]},
                            { text: "1 cake" }
                        ]
                    }
                ];
            }
        };       
    }

    return d;
});