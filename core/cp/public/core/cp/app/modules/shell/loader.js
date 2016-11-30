/// <summary>
/// Shell bootstrapper which help to config some neccesary starting-up for Shell module
/// such as routing resolver, actionagent, localization
/// </summary>
define(['modules/shell/configs/dependencies'], function () {
    // tell Angular create a new shell Module    
	var _m = angular.module('shell', ['shell.services', 'shell.controllers', 'shell.directives']);    
    
    return _m;
});