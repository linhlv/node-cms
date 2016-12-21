/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $state, $sessionStorage, $stateParams, pagesSvc){
        var vm = this;

        if($stateParams.typeId){
            pagesSvc.getTemplatesAll().then(function(res){
                if(res && res.items){
                    vm.items = res.items;                    
                }            
            });
        }
        
        vm.next = function(item){            
            $state.go('pages.add.3', {typeId : $stateParams.typeId, templateId: item._id});
        };
    }

    return c;
});