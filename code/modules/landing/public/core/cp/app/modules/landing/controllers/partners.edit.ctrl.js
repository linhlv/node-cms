/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $state, $stateParams){
        var vm = this, id = $stateParams.id;
        vm.includes = function(s){ return $state.includes(s); };
        vm.tabSelect = function(s){ $state.go('templates.edit.' + s, id); };
        vm.title = ((id && id!=='new') ? 'Editing' : 'New') + ' partner account';
        vm.data = vm.data || {};
        
    }

    return c;
});