/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function d(){
        return {
            restrict: 'E',
            scope: {
                field : '='
            },        
            templateUrl: 'core/cp/app/modules/pages/directives/editingField.html',    
            link: function(scope, element, attr) {}, 
            controller : function($scope){
                var vm = this;
                $scope.$watch('field', function(newValue, oldValue){
                    vm.field = newValue;
                });
            }, 
            controllerAs: 'vm'
        };       
    }

    return d;
});