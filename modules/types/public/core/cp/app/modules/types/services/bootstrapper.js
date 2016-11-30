define([
        'modules/types/services/types.svc'
        ],
    function (types) {
        angular.module('types.services', [])
                // help to handle broadcasting or catching events which raised from other components
                .service('types.svc', ['$http', 'httpHandler', types]);
});