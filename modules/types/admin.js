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
    
    router.spa = true;

    router.get_module_name = function(req) {
        i18nm.setLocale(req.session.current_locale);
        return i18nm.__("module_name");
    };

    router.post('/data/save',function(req, res){
        i18nm.setLocale(req.session.current_locale);
        var rep = {
            err_fields: [],
            status: 1
        };

        // Check authorization
        if (!req.session.auth || req.session.auth.status < 2) {
            rep.status = 0;
            rep.error = i18nm.__("unauth");
            res.send(JSON.stringify(rep));
            return;
        }

        // Fields validation
        var types_data = req.body;
        if (!types_data) {
            rep.status = 0;
            rep.error = i18nm.__("invalid_query");
            return res.send(JSON.stringify(rep));
        }

        if (!types_data.typeName) {
            rep.status = 0;
            rep.error = i18nm.__("invalid_query");
            return res.send(JSON.stringify(rep));
        }

        if (!types_data.typeName) {
            rep.status = 0;
            rep.error = i18nm.__("invalid_query");
            return res.send(JSON.stringify(rep));
        }


        var query = {
            typeName: types_data.typeName
        };

        app.get('mongodb').collection('types').find(query).count(function(err, items_count) {
             if (!err && items_count > 0) {
                rep.status = 0;
                rep.error = i18nm.__("invalid_query");
                res.send(JSON.stringify(rep));                               
             }else{
                types_data._id = new ObjectId()
                
                app.get('mongodb').collection('types').insert(types_data, function(err){
                    if (err) {
                        rep.status = 0;
                        rep.error = i18nm.__("invalid_query");                        
                        res.send(JSON.stringify(rep));
                    }
                });                
             }
        });        

        res.send(JSON.stringify(rep));
    });

    return router;
};