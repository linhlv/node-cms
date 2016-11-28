/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $state, $sessionStorage){
        var vm = this;
        $sessionStorage.pageType = $sessionStorage.pageType || {};
        $sessionStorage.pageType.step1 = $sessionStorage.pageType.step1 || {};        
        vm.data = $sessionStorage.pageType.step1;        
        vm.next = function(){            
            $sessionStorage.pageType.step1 = vm.data;
            $state.go('types.add.2');
        }
    }

    return c;
});