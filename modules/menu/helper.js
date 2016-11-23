module.exports = function(app) {
    var helpers = {};

    helpers.menu = function(){
        return 'helpers:menu';
    };

    helpers.x = function(){
        return 'helpers:x';
    };

    return helpers;
};