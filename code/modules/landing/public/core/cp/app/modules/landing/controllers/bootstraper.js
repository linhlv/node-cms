define([
    'modules/landing/controllers/landing.ctrl', 
    'modules/landing/controllers/partners.ctrl', 
    'modules/landing/controllers/contacts.ctrl'],
    function (landing, requests, contacts) {
        angular.module('landing.controllers', [])
            .controller('landing.ctrl', ['$scope', landing])
            .controller('partners.ctrl', ['$scope', '$http', requests])
            .controller('contacts.ctrl', ['$scope', contacts]);
});