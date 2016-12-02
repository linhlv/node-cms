/// <summary>
/// Pages bootstrapper which help to config some neccesary starting-up for Pages module
/// such as routing resolver, actionagent, localization
/// </summary>
define(['modules/landing/configs/dependencies'], function () {
    // tell Angular create a new pages Module
    var _m = angular.module('pages', ['pages.controllers']);   

    return _m;
});