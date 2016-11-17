define([], function(){
    return {
        configure: function(_m, _mm){
            _m.config(['$stateProvider', function($stateProvider){
                _.forEach(_mm, function(m){
                    var _md = m[0], _mp = 'app/modules/' + m[0].name;

                    var _mstate = {
                        name : _md.routing_prefix,
                        url: '/' + _md.routing_prefix
                    };

                    if(!_md.template && !_md.templateUrl){                                
                        _mstate.template = '<ui-view></ui-view>';
                    }else{                        
                        if(_md.templateUrl){
                            _mstate.templateUrl = window.configs.baseUrl +  _mp + '/views/' +  _md.templateUrl;
                        }

                        if(_md.template){
                            _mstate.template = _md.template;
                        }
                    }

                    if(_md.controller){
                        _mstate.controller = _md.controller;
                    }

                    $stateProvider.state(_mstate);
                    
                    if(_md.routes){
                        _.forEach(_md.routes, function(r){                                
                            var state = {
                                name : _md.routing_prefix + '.' + r.name,                                    
                                url: r.url
                            };

                            if(r.templateUrl){
                                state.templateUrl = window.configs.baseUrl +  _mp + '/views/' +  r.templateUrl;
                            }

                            if(r.template){
                                state.template = r.template;
                            }

                            if(r.controller){
                                state.controller = r.controller;
                            }

                            $stateProvider.state(state);
                        });
                    }                    
                });

            }]);  
        }
    } 
});