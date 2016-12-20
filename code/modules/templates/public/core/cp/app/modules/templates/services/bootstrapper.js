define([
        'modules/templates/services/templates.svc'
        ],
    function (templates) {
        angular.module('templates.services', [])
                // help to handle broadcasting or catching events which raised from other components
                .service('templates.svc', ['$http', 'httpHandler', templates]);
});