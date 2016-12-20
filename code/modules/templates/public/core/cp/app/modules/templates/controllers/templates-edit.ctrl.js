/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $state, $sessionStorage, $stateParams, templatesSvc){
        var vm = this, id = $stateParams.id;
        vm.includes = function(s){ return $state.includes(s); };
        vm.tabSelect = function(s){ $state.go('templates.edit.' + s, id); };
        vm.title = (id ? 'Editing' : 'New') + ' page template';
        vm.data = vm.data || {};
        
        if(id){
            // https://ace.c9.io/#nav=about
            templatesSvc.get(id).then(function(res){
                if(res && res.data){
                    vm.data = res.data;
                }            
            });
        }       

        /*
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/javascript"); 
        */

        vm.aceLoaded = function(){
            console.log('ace loaded');
        };

        vm.aceChanged = function(){
            console.log('ace changed');
        };

        vm.aceBlured = function(){
            console.log('ace aceBlured');
        };

        vm.save = function(){
            var template = {
                displayName: vm.data.displayName,
                template : vm.data.template
            };

            console.log(template)
        }
    }

    return c;
});