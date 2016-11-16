
define([], function(){ 
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

            require(pathModules, function(){
                var metaModuleAjaxes = [];
                
                _.forEach(metaModules, function(mm){
                    metaModuleAjaxes.push($.get(mm));
                });

                $.whenall = function(arr) { return $.when.apply($, arr); };

                $.whenall(metaModuleAjaxes).done(function(){
                    var _mm = arguments;

                    var _sm = ['ui.router'];

                    refModules = refModules.concat(_sm);

                    var _m = angular.module(window.spa.name, refModules);

                    _m.config(['$stateProvider', function($stateProvider){
                        _.forEach(_mm, function(m){
                            var _md = m[0];
                            var _mstate = {
                                name : _md.routing_prefix,
                                url: '/' + _md.routing_prefix,
                                template: '<ui-view></ui-view>',
                                controller: function($state){
                                    console.log('test', $state.get());
                                }
                            };

                            $stateProvider.state(_mstate);
                               
                            _.forEach(_md.routes, function(r){                                
                                var state = {
                                    name : _md.routing_prefix + '.' + r.name,                                    
                                    url: r.url,
                                    template: r.template
                                };

                                if(r.controller){
                                    state.controller = r.controller;
                                    /*
                                    state.controller = function(){
                                        console.log('child');
                                    };
                                    */
                                }

                                console.log(state);

                                $stateProvider.state(state);
                            })
                        });

                    }]);                    

                    angular.element(function() {
                        angular.bootstrap(document, [window.spa.name]);
                    }); 
                    
                }, function(err){});                              
            });            
        }
    });
});