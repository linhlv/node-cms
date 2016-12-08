/// <summary>
/// Log bootstrapper which help to config some neccesary starting-up for Log module
/// such as routing resolver, actionagent, localization
/// </summary>
define([], function () {
    // tell Angular create a new log Module
    var _m = angular.module('log', []);


    return _m;
});