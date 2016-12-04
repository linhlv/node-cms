(function(){
    var landing = angular.module('landing', []);

    landing.controller('request.ctrl', ['$scope', function($scope){
        var vm = this;
        vm.data = {}, vm.submitting = false;

        vm.send = function(){
            vm.submitting = true;
            
        };
    }]);

    landing.controller('contact.ctrl', ['$scope', function($scope){
        var vm = this;
        vm.data = {}, vm.submitting = false;

        vm.send = function(){
            vm.submitting = true;
            
        };
    }]);

    landing.controller('login.ctrl', ['$scope', function($scope){
        var vm = this;
        vm.data = {}, vm.submitting = false;

        vm.send = function(){
            vm.submitting = true;
            
        };
    }]);
})();