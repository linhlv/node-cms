'use strict';
/// <summary>
/// all Apis call to application layer restful service which related to shell module 
/// for example: menu, taskbar, commontask, thumbnail...
/// </summary>
define([], function () {    
    
    //Events Publish/Subscribe
    function s($rootScope){
        /// <summary>
        /// Event Publish
        /// </summary>
        this.trigger = function (name, args) {
            $rootScope.$broadcast(name, args);
        };

        /// <summary>
        /// Event Subscribe
        /// </summary>
        this.on = function (name, handler) {
            $rootScope.$on(name, handler);
        };
    }

    return s;
});