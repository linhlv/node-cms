/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $state, $sessionStorage, $stateParams, typesSvc){
        var vm = this, id = $stateParams.id;
        typesSvc.get(id).then(function(res){
            if(res && res.data){
                //console.log(res.data);
                vm.data = res.data;
                $scope.data = res.data;
            }            
        });

        vm.save = function(){
            typesSvc.save(vm.data).then(function(res){
                if(res){
                    swal({
                        title: "Saved!",   
                        text: "Your basic type information was update successfully!",   
                        type: "success"
                    }, function(){});         
                }
            });   
        }
    }

    return c;
});