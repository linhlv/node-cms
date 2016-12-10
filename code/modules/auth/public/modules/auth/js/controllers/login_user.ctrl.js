(function(){
    window.rootModule.controller('login.user.ctrl', ['$scope', 'authSvc', function($scope, authSvc){
        var vm = this;
        vm.submitting = false;
        vm.status = true;
        
        vm.login = function(){
            vm.submitting = true;           

            if($scope.f.$valid){
                authSvc.process(vm.data.email, vm.data.password).then(function(res){
                    if(res.data && res.data.result){
                        vm.submitting = false;
                        location.href = "/?rnd=" + Math.random().toString().replace('.', '');
                        return;               
                    }   

                    vm.status = false;           
                }, function(err){                    
                    vm.submitting = false;
                    vm.status = false;
                    $scope.f.$setPristine();
                    $scope.f.$setUntouched();
                });
            }
        };
    }]);
})();
