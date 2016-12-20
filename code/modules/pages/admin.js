module.exports = function(app) {
     var router = app.get('express').Router(),
        path = require('path'),
        ObjectId = require('mongodb').ObjectID,
        i18nm = new(require('i18n-2'))({
            locales: app.get('config').locales.avail,
            directory: path.join(__dirname, 'lang'),
            extension: '.js',
            devMode: app.get('config').locales.dev_mode
        }),
        parser = app.get('parser'),
        async = require('async');
        
    // false to hide on menu
    router.spa = true;

    router.get_module_name = function(req) {
        i18nm.setLocale(req.session.current_locale);
        return i18nm.__("module_name");
    };

    router.get('/data/load',function(req, res){         
        var query_string = req.query; 
        var sort = {};
        var rep = {};
        var find_query = {
           
        };       

        app.get('mongodb').collection('types').find(find_query)        
            .sort(sort).toArray(function(err, items) {
                if(items && items.length && items.length){
                    // Return results
                    rep.status = 1;
                    rep.data = items;                    
                    return res.send(JSON.stringify(rep));
                }
            });   
    });

    return router;
};