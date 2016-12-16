/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $state, $sessionStorage, $stateParams, templatesSvc){
        var vm = this, id = $stateParams.id;
        vm.includes = function(s){ return $state.includes(s); };
        vm.tabSelect = function(s){ $state.go('templates.edit.' + s, id); };
        // https://ace.c9.io/#nav=about
        templatesSvc.get(id).then(function(res){
            if(res && res.data){
                vm.data = res.data;
            }            
        });
    }

    return c;
});