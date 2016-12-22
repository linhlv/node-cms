/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $state, $sessionStorage, $stateParams, $q, typesSvc, templatesSvc, pagesSvc){
        var vm = this;        

        if($stateParams.typeId && $stateParams.templateId ){
            var callback = function(value){
                return value;
            };

            var promiseGetType = typesSvc.get($stateParams.typeId).then(callback);
            var promiseGetTemplate = templatesSvc.get($stateParams.templateId).then(callback);

            $q.all([promiseGetType, promiseGetTemplate]).then(
            function(values){
                console.log(values);
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