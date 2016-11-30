'use strict';
/// <summary>
/// all Apis call to application layer restful service which related to shell module 
/// for example: menu, taskbar, commontask, thumbnail...
/// </summary>
define([], function () {    
    
    //Events Publish/Subscribe
    function s($q){
        /// <summary>
        /// Event Publish
        /// </summary>
        this.handleSuccess = function (res) {
            return res.data;
        };

        /// <summary>
        /// Event Subscribe
        /// </summary>
        this.handleError = function (res) {
             return $q.reject(res.data);
        };
    }

    return s;
});