(function(){
    window.rootModule.controller('login.user.ctrl', ['$scope', 'authSvc', function($scope, authSvc){
        var vm = this;
        vm.submitting = false;
        
        vm.login = function(){
            vm.submitting = true;           

            if($scope.f.$valid){
                authSvc.process(vm.data.email, vm.data.password).then(function(res){
                    if(res.data && res.data.result){
                        vm.submitting = false;
                        /*
                        $scope.f.$setPristine();
                        $scope.f.$setUntouched();
                        */
                        location.href = "/?rnd=" + Math.random().toString().replace('.', '');
                        return;               
                    }              
                }, function(err){                    
                    vm.submitting = false;
                    $scope.f.$setPristine();
                    $scope.f.$setUntouched();
                });
            }
        };
    }]);
})();
