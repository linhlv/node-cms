(function(){
    window.rootModule.controller('login.user.ctrl', ['$scope', 'authSvc', function($scope, authSvc){
        var vm = this;
        vm.submitting = false;
        
        vm.login = function(){
            vm.submitting = true;
            /*
            if (!vm.username.match(/^[A-Za-z0-9_\-]{3,20}$/)) {                
                $('#auth_username').focus();
                UIkit.notify({
                    message: _lang_vars.invalid_username_syntax,
                    status: 'danger',
                    timeout: 2000,
                    pos: 'top-center'
                });
                return;
            }
            if (!vm.password.match(/^.{5,80}$/)) {                
                $('#auth_password').focus();
                UIkit.notify({
                    message: _lang_vars.invalid_password_syntax,
                    status: 'danger',
                    timeout: 2000,
                    pos: 'top-center'
                });
                return;
            }
            */

            if($scope.f.$valid){
                authSvc.process(vm.data.email, vm.data.password).then(function(res){
                    if(res.data && res.data.result!=1){ //failed 
                    }else{
                        location.href = redirect_url + "?rnd=" + Math.random().toString().replace('.', '');                        
                    }

                    vm.submitting = false;
                    $scope.f.$setPristine();
                    $scope.f.$setUntouched();
                }, function(err){                    
                    vm.submitting = false;
                    $scope.f.$setPristine();
                    $scope.f.$setUntouched();
                });
            }
        };
    }]);
})();
