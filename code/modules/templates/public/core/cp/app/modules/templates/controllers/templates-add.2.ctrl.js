/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $state, $sessionStorage){
        var vm = this;
        $sessionStorage.pageType = $sessionStorage.pageType || {};
        $sessionStorage.pageType.step2 = $sessionStorage.pageType.step2 || {};        
        vm.data = $sessionStorage.pageType.step2;
        vm.back = function(){ $state.go('templates.add.1');};
        vm.next = function(){
            $sessionStorage.pageType.step2 = vm.data;
            var _s = vm.data.types ? 'templates.add.3':'templates.add.4';
            $state.go(_s);
        } 
    }

    return c;
});