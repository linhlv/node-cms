/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $state, $sessionStorage, pagesSvc){
        var vm = this;

        pagesSvc.getTypesAll().then(function(res){
            if(res && res.items){
                vm.items = res.items;                    
            }            
        });

        vm.next = function(item){            
            $state.go('pages.add.2', {typeId : item._id});
        };
    }

    return c;
});