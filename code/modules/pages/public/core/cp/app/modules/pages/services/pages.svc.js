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
        this.getTypesAll = function () {
            return $http.get('/cp/types/data/load').then(httpHandler.handleSuccess, httpHandler.handleError);
        };   

        /// <summary>
        /// save type
        /// </summary>
        this.getTemplatesAll = function () {
            return $http.get('/cp/templates/data/load').then(httpHandler.handleSuccess, httpHandler.handleError);
        };    

        /// <summary>
        /// save type
        /// </summary>
        this.save = function (type) {
            return $http.post('/cp/types/data/save', type).then(httpHandler.handleSuccess, httpHandler.handleError);
        };
    }

    return s;
});