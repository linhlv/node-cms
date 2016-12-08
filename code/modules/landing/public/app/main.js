(function(){
    window.rootModule = window.rootModule || angular.module('root', []);

    window.rootModule.controller('request.ctrl', ['$scope', '$http', function($scope, $http){
        var vm = this;
        vm.data = {}, vm.submitting = false, vm.alert = {show: false, message: ''};

        console.log($scope.f);

        vm.send = function(){
            vm.submitting = true;
            
            var options = { method: 'POST', url: '/request', data: vm.data, headers: { 'Content-Type': 'application/json' } };            
            
            if($scope.f.$valid){  
                $http(options).then(function (data, status, headers, cfg) {
                    if(!data.data.status){
                        //error
                        if(data.data.reason && data.data.reason.requestExisting){
                            vm.alert.show = true;
                            vm.alert.class = 'alert-warning';
                            vm.alert.message = 'Your email is used to request full catalogue we will feedback you soon or please contact our agent for support!';                            
                        }                        

                        if(data.data.reason && data.data.reason.userExisting){
                            vm.alert.show = true;
                            vm.alert.class = 'alert-warning';
                            vm.alert.message = 'Your were already provided access information to view full catalogue or you my forgot your password, use <a href="/forgot-password">forgot password</a> feature!';                            
                        }

                         if(data.data.reason && data.data.reason.systemError){
                            vm.alert.show = true;
                            vm.alert.class = 'alert-danger';
                            vm.alert.message = 'There was an error while processing, please try again!';
                        }   

                        vm.submitting = false;
                        return;                    
                    }

                    vm.alert.show = true;
                    vm.alert.class = 'alert-success';
                    vm.alert.message = 'Your request has been sent to us, you may need to confirm by following the instruction on email, after your confirmation, our agent will review and feedback to you soon!';
                    
                    vm.data.name = '';
                    vm.data.company = '';
                    vm.data.phone = '';
                    vm.data.email = '';
                    vm.data.message = '';
                    
                    vm.submitting = false;

                    $scope.f.$setPristine();
                    $scope.f.$setUntouched();
                },function (error, status) { vm.submitting = false; });  
            }
        };
    }]);

    window.rootModule.controller('contact.ctrl', ['$scope', function($scope){
        var vm = this;
        vm.data = {}, vm.submitting = false;

        vm.send = function(){
            vm.submitting = true;
            
        };
    }]);

    window.rootModule.controller('login.ctrl', ['$scope', function($scope){
        var vm = this;
        vm.data = {}, vm.submitting = false;

        vm.send = function(){
            vm.submitting = true;
            
        };
    }]);
})();