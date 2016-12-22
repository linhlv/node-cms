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
                    if(values && values.length === 2){
                        vm.data = {};
                        vm.data.type = values[0].data;
                        vm.data.template = values[1].data;
                    }
                }
            );
        }

        vm.save = function(){

        };
    }

    return c;
});