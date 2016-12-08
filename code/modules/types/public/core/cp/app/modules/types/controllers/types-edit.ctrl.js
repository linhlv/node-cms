/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $state, $sessionStorage, $stateParams, typesSvc){
        var vm = this, id = $stateParams.id;
        vm.includes = function(s){ return $state.includes(s); };
        vm.tabSelect = function(s){ $state.go('types.edit.' + s, id); };
        
        typesSvc.get(id).then(function(res){
            if(res && res.data){
                vm.data = res.data;
            }            
        });
    }

    return c;
});