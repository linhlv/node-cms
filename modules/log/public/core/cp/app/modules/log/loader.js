/// <summary>
/// Log bootstrapper which help to config some neccesary starting-up for Log module
/// such as routing resolver, actionagent, localization
/// </summary>
define([], function () {
    // tell Angular create a new log Module
    var _m = angular.module('log', []);

    // router configure for log module
    _m.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
	function ($routeProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
	    // fill-up register information
	    _m.register = {
		    controller: $controllerProvider.register,
		    directive: $compileProvider.directive,
		    filter: $filterProvider.register,
		    factory: $provide.factory,
		    service: $provide.service
		};
	}]);

    return _m;
});