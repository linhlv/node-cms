(function(){
    window.rootModule.controller('loginCtrl', ['$scope', 'authSvc', function($scope, authSvc){
        var vm = this;
        
        vm.login = function(){
            authSvc.process(vm.username, vm.password).then(function(res){
                if(res.data && res.data.result!=1){
                    swal("Access Denied!", "Your access information is not correct or you don't have permission to access CP!", "warning", function(){});
                }else{
                    location.href = redirect_url + "?rnd=" + Math.random().toString().replace('.', '');
                }
            }, function(err){
                console.log(err);
            });
        };
    }]);
})();
