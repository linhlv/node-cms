/// <summary>
// monitor common task change
/// </summary>
define(function () {
    function c($scope, $state, $stateParams, $http){
        var vm = this, id = $stateParams.id;
        vm.includes = function(s){ return $state.includes(s); };
        vm.tabSelect = function(s){ $state.go('templates.edit.' + s, id); };
        vm.title = ((id && id!=='new') ? 'Editing' : 'New') + ' partner account';
        vm.data = vm.data || {};

        vm.save = function(){            
            var post_options = { method: 'POST', url: '/cp/landing/create_user', data: vm.data, headers: { 'Content-Type': 'application/json' } };
            $http(post_options).then(function (res, status, headers, cfg) {
                if(res.data.existing){
                     swal({
                        title: 'Account is existing!',   
                        text: 'Email address your are using to create this user is already existed. Please check again!',   
                        type: 'error'
                     });
                }else{
                    if(res.data.status){
                        swal({
                            title: 'Account is created!',   
                            text: 'Account is created successfully!',   
                            type: 'success'
                        });
                    }
                }
            },function (error, status) { vm.submitting = false; });
        }
        
    }

    return c;
});