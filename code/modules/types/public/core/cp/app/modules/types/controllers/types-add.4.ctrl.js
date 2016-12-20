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
            if(!$sessionStorage.pageType.step2){
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

        vm.back = function(){
            if(!vm.data.step2.types){
                $state.go('types.add.2');
            } else{
                $state.go('types.add.3');
            }                
        };

        vm.finish = function(){            
            var d = {
                displayName: vm.data.step1.displayName,
                name: vm.data.step1.name,
                namespace: vm.data.step1.namespace,                   
                types: vm.data.step2.types===undefined ? false : true               
            };

            if(vm.data.step2.types){ //in case page type 
                d.fields = vm.data.step3.fields,
                d.typeName = vm.data.step2.typeName
            }            

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