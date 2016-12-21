/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $state, $sessionStorage, $stateParams, $q, pagesSvc){
        var vm = this;        

        if($stateParams.typeId && $stateParams.templateId ){
            $q.all(pagesSvc.getType($stateParams.typeId), pagesSvc.getTemplate($stateParams.templateId))
                .then(function(data){
                    console.log(data);
            });

            /*
            pagesSvc.getType($stateParams.typeId).then(function(res){
                if(res && res.data){
                    vm.pageType = res.data                                       
                }            
            });       
            */
        }

        vm.save = function(){
            console.log(vm.pageType.fields);
        }
    }

    return c;
});