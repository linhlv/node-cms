
define([], function(){ 
    $.get('/cp/spa_metadata.json', function(metadata){
        if(metadata && metadata.modules){
            var pathModules = [], moduleRoot = 'modules/', refModules = [];
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
            });            

            console.log(pathModules);

            require(pathModules, function(){
                console.log(refModules);
                angular.module(window.spa.name, refModules);
                angular.bootstrap(document, [window.spa.name]);
            });            
        }
    });
});