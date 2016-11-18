/// <summary>
/// Users bootstrapper which help to config some neccesary starting-up for Settings module
/// such as routing resolver, actionagent, localization
/// </summary>
define([], function () {
    // tell Angular create a new users Module
    var _m = angular.module('users', []);

    return _m;
});