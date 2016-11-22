(function(){
    window.modules.auth.service('authSvc', ['$http', '$q', function($http, $q){
        var process = function(username, password){
            var deferred = $q.defer();
            var req = {
                url : '/auth/process',
                method: 'POST',
                data: {
                    username: username,
                    password: password
                }
            };

            $http(req).then(function(res){
                deferred.resolve(res);
            }, function(err){ 
                deferred.reject(err);
            });            

            return deferred.promise;
        };

        var captcha = function(){

        };

        return {
            process: process,
            captcha: captcha
        };
    }]);
})();
