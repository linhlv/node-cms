/// <summary>
/// Menu bootstrapper which help to config some neccesary starting-up for Menu module
/// such as routing resolver, actionagent, localization
/// </summary>
define(['modules/types/configs/dependencies'], function () {
    // tell Angular create a new menu Module
    var _m = angular.module('types', ['types.services','types.controllers']);

    
    return _m;
});