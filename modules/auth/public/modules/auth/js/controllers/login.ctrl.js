(function(){
    window.modules.auth.controller('loginCtrl', ['$scope', 'authSvc', function($scope, authSvc){
        var vm = this;
        
        vm.login = function(){

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

            authSvc.process(vm.username, vm.password).then(function(res){
                if(res.result!=1){
                    //failed
                }else{
                    location.href = redirect_url + "?rnd=" + Math.random().toString().replace('.', '');
                }
            }, function(err){
                console.log(err);
            });
        };
    }]);
})();
