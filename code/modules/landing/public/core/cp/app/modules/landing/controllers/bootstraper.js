define([
    'modules/landing/controllers/landing.ctrl', 
    'modules/landing/controllers/partners.ctrl', 
    'modules/landing/controllers/contacts.ctrl',
    'modules/landing/controllers/partners.list.ctrl',
    'modules/landing/controllers/partners.edit.ctrl'],
    function (landing, requests, contacts, partnersList, partnersEdit) {
        angular.module('landing.controllers', [])
            .controller('landing.ctrl', ['$scope', landing])
            .controller('partners.ctrl', ['$scope', '$http', requests])
            .controller('partners.list.ctrl', ['$scope', '$http', partnersList])
            .controller('partners.edit.ctrl', ['$scope', '$state', '$stateParams', partnersEdit])
            .controller('contacts.ctrl', ['$scope', contacts]);
});