module.exports = function(app) {
    var router = app.get('express').Router(),
        path = require('path'),
        exphbs = app.get('exphbs'),
        renderer = app.get('renderer'),        
        config = app.get('config');
          
    
    router.get(/(.*)/, function(req, res, next) {
        renderer.dir('views').render(req, 'home', undefined, undefined, res);           
    });

    return router;
};