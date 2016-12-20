'use strict';
/// <summary>
/// all Apis call to application layer restful service which related to shell module 
/// for example: menu, taskbar, commontask, thumbnail...
/// </summary>
define([], function () {    
    
    //Events Publish/Subscribe
    function s($http, httpHandler){

        /// <summary>
        /// save template
        /// </summary>
        this.get = function (id) {
            return $http.get('/cp/templates/data/get', { params: { id: id }}).then(httpHandler.handleSuccess, httpHandler.handleError);
        };


        /// <summary>
        /// save template
        /// </summary>
        this.getAll = function () {
            return $http.get('/cp/templates/data/load').then(httpHandler.handleSuccess, httpHandler.handleError);
        };

        /// <summary>
        /// save template
        /// </summary>
        this.save = function (template) {
            return $http.post('/cp/templates/data/save', template).then(httpHandler.handleSuccess, httpHandler.handleError);
        };
    }

    return s;
});