define([
        'modules/shell/services/events',
        'modules/shell/services/httpHandler'],
    function (events, httpHandler) {
        angular.module('shell.services', [])
                // help to handle broadcasting or catching events which raised from other components
                .service('events', ['$rootScope', events])
                .service('httpHandler', ['$q', httpHandler]);
});