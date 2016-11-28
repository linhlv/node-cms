/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $state, $sessionStorage){
        var vm = this;
        $sessionStorage.pageType = $sessionStorage.pageType || {};
        $sessionStorage.pageType.step3 = $sessionStorage.pageType.step3 || {};        
        vm.data = $sessionStorage.pageType.step3;

        if(!$sessionStorage.pageType.step2 || !$sessionStorage.pageType.step2.types){
            // did not go to type selection step or selected container type
            swal({
                title: "Oops!",   
                text: "You selected container as page type or didn't select page type yet!",   
                type: "error"
            }, function(){
                $state.go('types.add.2');
            });            
        }        
    }

    return c;
});