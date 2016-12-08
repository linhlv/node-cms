/// <summary>
/// Files bootstrapper which help to config some neccesary starting-up for Files module
/// such as routing resolver, actionagent, localization
/// </summary>
define([], function () {
    // tell Angular create a new files Module
    var _m = angular.module('files', []);


    return _m;
});