/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function d(){
        return {
            restrict: 'E',
            scope: {
                fields : '=fields'
            },
            templateUrl: 'core/cp/app/modules/types/directives/fieldsEditor.html',            
            link: function(scope, element, attr) {}, 
            controller : function($scope){
                var vm = this;
                vm.data = {};
                vm.data.fields = $scope.fields;
                
                if(vm.data.fields && vm.data.fields.length){            
                    vm.selectedField = vm.data.fields[0];
                }

                var move = function(array, element, delta) {
                    var index = array.indexOf(element);
                    var newIndex = index + delta;
                    if (newIndex < 0  || newIndex == array.length) return; //Already at the top or bottom.
                    var indexes = [index, newIndex].sort(); //Sort the indixes
                    array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); //Replace from lowest index, two elements, reverting the order
                };

                var moveUp = function(array, element) {
                    move(array, element, -1);
                };

                var moveDown = function(array, element) {
                    move(array, element, 1);
                };

                function resetOrders(){            
                    _.forEach(vm.data.fields, function(f, i){                
                        f.order = i+1;
                    });
                }

                vm.getIcon = function(item){
                    return item.name.charAt(0);
                };   

                vm.add = function(){
                    vm.data.fields.unshift({
                        id: guid(),
                        order: 0,
                        name: 'New field',
                        description: 'New field...'
                    });

                    vm.selectedField = vm.data.fields[0];
                    resetOrders();
                };

                vm.delete = function(){
                    var deleted = 0;
                    _.remove(vm.data.fields, function(f, i){
                        deleted = i;
                        return (f.id == vm.selectedField.id);
                    });

                    if(vm.data.fields && vm.data.fields.length && deleted){
                        vm.selectedField = vm.data.fields[0];
                    }else{
                        vm.selectedField = null;
                    }     
                    resetOrders();       
                };

                vm.selectField = function(item){
                    vm.selectedField = item;
                };

                vm.moveUp = function(){
                    moveUp(vm.data.fields, vm.selectedField);
                    resetOrders();
                }

                vm.moveDown = function(){
                    moveDown(vm.data.fields, vm.selectedField);
                    resetOrders();
                }
            }, 
            controllerAs: 'vm'
        };       
    }

    return d;
});