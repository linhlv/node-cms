/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $state, $sessionStorage){
         var vm = this;
        $sessionStorage.pageType = $sessionStorage.pageType || {};                
        vm.data = $sessionStorage.pageType;
        vm.data.types = $sessionStorage.pageType.step2.types;       
    }

    return c;
});