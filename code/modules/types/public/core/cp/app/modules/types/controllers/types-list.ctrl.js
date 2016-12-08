/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $state, $sessionStorage, typesSvc){
        var vm = this;

        vm.edit = function(item){$state.go('types.edit.general', {id: item._id});}
        
        typesSvc.getAll().then(function(res){
            if(res && res.items){
                vm.items = res.items;                    
                console.log('type list', vm.items);
            }            
        });
    }

    return c;
});