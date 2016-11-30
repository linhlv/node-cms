/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $state, $sessionStorage, typesSvc){
        var vm = this;
        if(!$sessionStorage.pageType){
            // did not go to step 1
            swal({
                title: "Oops!",   
                text: "Please finish step 1 by entering basic information!",   
                type: "error"
            }, function(){
                $state.go('types.add.1');
            });     
        }else{            
            $sessionStorage.pageType = $sessionStorage.pageType || {};                
            vm.data = $sessionStorage.pageType;
            if(!$sessionStorage.pageType.step2 || !$sessionStorage.pageType.step2.types){
                // did not go to step 2
                swal({
                    title: "Oops!",   
                    text: "Please finish step 2 by selecting a page type type!",   
                    type: "error"
                }, function(){
                    $state.go('types.add.2');
                });     
            }else{
                vm.data.types = $sessionStorage.pageType.step2.types;
            }            
        }        

        vm.finish = function(){
            var d = {
                fields : vm.data.step3.fields,
                types: vm.data.step2.types,
                typeName: vm.data.step2.typeName,
                displayName: vm.data.step1.displayName, 
                name: vm.data.step1.name
            };
            typesSvc.save(d).then(function(res){
                if(res){
                    delete $sessionStorage.pageType;
                    $state.go('types.list');
                }
            });            
        };
               
    }

    return c;
});