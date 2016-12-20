'use strict';
/// <summary>
/// all Apis call to application layer restful service which related to shell module 
/// for example: menu, taskbar, commontask, thumbnail...
/// </summary>
define([], function () {    
    
    //Events Publish/Subscribe
    function s($http, httpHandler){

        /// <summary>
        /// save type
        /// </summary>
        this.get = function (id) {
            return $http.get('/cp/templates/data/get', { params: { id: id }}).then(httpHandler.handleSuccess, httpHandler.handleError);
        };


        /// <summary>
        /// save type
        /// </summary>
        this.getAll = function () {
            return $http.get('/cp/templates/data/load').then(httpHandler.handleSuccess, httpHandler.handleError);
        };

        /// <summary>
        /// save type
        /// </summary>
        this.save = function (type) {
            return $http.post('/cp/templates/data/save', type).then(httpHandler.handleSuccess, httpHandler.handleError);
        };
    }

    return s;
});