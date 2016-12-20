/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $state, $sessionStorage, templatesSvc){
        var vm = this;

        vm.edit = function(item){$state.go('templates.edit', {id: item._id});}
        
        templatesSvc.getAll().then(function(res){
            if(res && res.items){
                vm.items = res.items;                    
            }            
        });
    }

    return c;
});