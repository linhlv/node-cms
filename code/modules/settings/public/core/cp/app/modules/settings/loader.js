/// <summary>
/// Settings bootstrapper which help to config some neccesary starting-up for Settings module
/// such as routing resolver, actionagent, localization
/// </summary>
define([], function () {
    // tell Angular create a new settings Module
    var _m = angular.module('settings', []);

    return _m;
});