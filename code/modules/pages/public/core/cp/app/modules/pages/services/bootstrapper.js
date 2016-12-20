define([
        'modules/pages/services/pages.svc'
        ],
    function (pages) {
        angular.module('pages.services', [])
                // help to handle broadcasting or catching events which raised from other components
                .service('pages.svc', ['$http', 'httpHandler', pages]);
});