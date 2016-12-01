define(['modules/types/controllers/types-list.ctrl',
'modules/types/controllers/types-add.1.ctrl',  
'modules/types/controllers/types-add.2.ctrl',
'modules/types/controllers/types-add.3.ctrl',
'modules/types/controllers/types-add.4.ctrl',
'modules/types/controllers/types-edit.ctrl'],
    function (types_list, types_add_1, types_add_2, types_add_3, types_add_4, types_edit) {
        angular.module('types.controllers', [])
            .controller('types-list.ctrl', ['$scope', '$state', '$sessionStorage', 'types.svc', types_list])
            .controller('types-add.1.ctrl', ['$scope', '$state', '$sessionStorage', types_add_1])        
            .controller('types-add.2.ctrl', ['$scope', '$state', '$sessionStorage', types_add_2])        
            .controller('types-add.3.ctrl', ['$scope', '$state', '$sessionStorage', types_add_3])        
            .controller('types-add.4.ctrl', ['$scope', '$state', '$sessionStorage', 'types.svc', types_add_4])
            .controller('types-edit.ctrl', ['$scope', '$state', '$sessionStorage', '$stateParams', 'types.svc', types_edit]);
});