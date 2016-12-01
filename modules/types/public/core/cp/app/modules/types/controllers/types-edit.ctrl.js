/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $state, $sessionStorage, $stateParams, typesSvc){
        var vm = this;
        vm.includes = function(s){ return $state.includes(s); };
        vm.tabSelect = function(s){ $state.go('types.edit.' + s, $stateParams.id); };
        
        typesSvc.getAll().then(function(res){
            if(res && res.items){
                vm.items = res.items;                    
                console.log('type edit', vm.items);
            }            
        });
    }

    return c;
});