define(['modules/templates/controllers/templates-list.ctrl',
'modules/templates/controllers/templates-add.1.ctrl',  
'modules/templates/controllers/templates-add.2.ctrl',
'modules/templates/controllers/templates-add.3.ctrl',
'modules/templates/controllers/templates-add.4.ctrl',
'modules/templates/controllers/templates-edit.ctrl',
'modules/templates/controllers/templates-edit-general.ctrl',
'modules/templates/controllers/templates-edit-fields.ctrl'],
    function (templates_list, templates_add_1, templates_add_2, templates_add_3, templates_add_4, templates_edit, templates_edit_general, templates_edit_fields) {
        angular.module('templates.controllers', [])
            .controller('templates-list.ctrl', ['$scope', '$state', '$sessionStorage', 'templates.svc', templates_list])
            .controller('templates-add.1.ctrl', ['$scope', '$state', '$sessionStorage', templates_add_1])        
            .controller('templates-add.2.ctrl', ['$scope', '$state', '$sessionStorage', templates_add_2])        
            .controller('templates-add.3.ctrl', ['$scope', '$state', '$sessionStorage', templates_add_3])        
            .controller('templates-add.4.ctrl', ['$scope', '$state', '$sessionStorage', 'templates.svc', templates_add_4])
            .controller('templates-edit.ctrl', ['$scope', '$state', '$sessionStorage', '$stateParams', 'templates.svc', templates_edit])
            .controller('templates-edit-general.ctrl', ['$scope', '$state', '$sessionStorage', '$stateParams', 'templates.svc', templates_edit_general])
            .controller('templates-edit-fields.ctrl', ['$scope', '$state', '$sessionStorage', '$stateParams', 'templates.svc', templates_edit_fields]);
});