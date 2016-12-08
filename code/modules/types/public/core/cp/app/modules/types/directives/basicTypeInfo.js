/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function d(){
        return {
            restrict: 'E',
            scope: {
                info : '='
            },
            templateUrl: 'core/cp/app/modules/types/directives/basicTypeInfo.html',            
            link: function(scope, element, attr) {}, 
            controller : function($scope){
                var vm = this;
                $scope.$watch('info', function(newValue, oldValue){
                    vm.data = newValue;
                });
            }, 
            controllerAs: 'vm'
        };       
    }

    return d;
});