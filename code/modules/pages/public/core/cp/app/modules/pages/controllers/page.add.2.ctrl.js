/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $state, $sessionStorage, $stateParams, pagesSvc){
        var vm = this;        

        if($stateParams.typeId){
            pagesSvc.get($stateParams.typeId).then(function(res){
                if(res && res.data){
                    vm.pageType = res.data                                       
                }            
            });       
        }
    }

    return c;
});