define(['modules/templates/controllers/templates-list.ctrl',
'modules/templates/controllers/templates-edit.ctrl'],
    function (templates_list, templates_edit) {
        angular.module('templates.controllers', [])
            .controller('templates-list.ctrl', ['$scope', '$state', '$sessionStorage', 'templates.svc', templates_list])           
            .controller('templates-edit.ctrl', ['$scope', '$state', '$sessionStorage', '$stateParams', 'templates.svc', templates_edit]);
});