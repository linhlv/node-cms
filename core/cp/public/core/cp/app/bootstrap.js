
define(['routing'], function(routing){ 
    $.get('/cp/spa_metadata.json', function(metadata){
        if(metadata && metadata.modules){
            var pathModules = [], moduleRoot = 'modules/', refModules = [], metaModules = [];
            window.spa = window.spa || {};
            window.spa.modules = {};

            _.forEach(window.spa.sysmodules, function(m){
                var _mp = moduleRoot + m;
                refModules.push(m);
                pathModules.push(_mp + '/loader');
            });

            _.forEach(metadata.modules, function(m){
                var _mp = moduleRoot + m.name;
                refModules.push(m.name);
                pathModules.push(_mp + '/loader');
                metaModules.push(window.configs.baseUrl + 'app/' + _mp + '/module.json');
            });          

            var metaModuleAjaxes = [];
            
            _.forEach(metaModules, function(mm){
                metaModuleAjaxes.push($.get(mm));
            });            

            $.whenall = function(arr) { return $.when.apply($, arr); };

            $.whenall(metaModuleAjaxes).done(function(){  
                var _mm = arguments;
                
                refModules = refModules.concat(window.spa.builtinmodules);

                require(pathModules, function(){
                    var _m = angular.module(window.spa.name, refModules);

                    routing.configure(_m, _mm);                      

                    angular.element(function() {
                        angular.bootstrap(document, [window.spa.name]);
                    });                                     
                });                 
                
            }, function(err){});   
        }
    });
});