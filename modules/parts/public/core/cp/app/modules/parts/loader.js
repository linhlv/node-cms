/// <summary>
/// Parts bootstrapper which help to config some neccesary starting-up for Parts module
/// such as routing resolver, actionagent, localization
/// </summary>
define([], function () {
    // tell Angular create a new parts Module
    var _m = angular.module('parts', []);

  
    return _m;
});