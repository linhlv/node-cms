/// <summary>
/// Menu bootstrapper which help to config some neccesary starting-up for Menu module
/// such as routing resolver, actionagent, localization
/// </summary>
define([], function () {
    // tell Angular create a new menu Module
    var _m = angular.module('menu', []);

    // router configure for menu module
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