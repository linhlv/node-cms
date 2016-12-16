/// <summary>
// monitor common task change
/// </summary>
define(['modules/templates/configs/mock'], function (mock) {
    function c($scope, $state, $sessionStorage){
        var vm = this;
        $sessionStorage.pageType = $sessionStorage.pageType || {};
        $sessionStorage.pageType.step3 = $sessionStorage.pageType.step3 || {};        
        vm.data = $sessionStorage.pageType.step3;
        vm.data.fields = vm.data.fields || mock;         

        if(!$sessionStorage.pageType.step2 || !$sessionStorage.pageType.step2.types){
            // did not go to type selection step or selected container type
            swal({
                title: "Oops!",   
                text: "You selected container as page type or didn't select page type yet!",   
                type: "error"
            }, function(){
                $state.go('templates.add.2');
            });            
        }        

        vm.back = function(){ $state.go('templates.add.2');};
        vm.next = function(){
             $sessionStorage.pageType.step3 = vm.data;
             $state.go('templates.add.4');
        }; 
    }

    return c;
});