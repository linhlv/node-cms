/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $state, $q, $sessionStorage, $stateParams, typesSvc, templatesSvc, pagesSvc){
        var vm = this;

        if($stateParams.typeId){

            var callback = function(value){
                return value;
            };

            var promiseGetType = typesSvc.get($stateParams.typeId).then(callback);
            var promiseGetTemplates = templatesSvc.getAll().then(callback);

             $q.all([promiseGetType, promiseGetTemplates]).then(
                function(values){
                    if(values && values.length === 2){
                        vm.data = {};
                        vm.data.type = values[0].data;
                        vm.items = values[1].items;     
                    }
                }
            );
        }
        
        vm.next = function(item){            
            $state.go('pages.add.3', {typeId : $stateParams.typeId, templateId: item._id});
        };
    }

    return c;
});