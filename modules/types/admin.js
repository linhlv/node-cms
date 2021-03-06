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

    router.get('/data/get',function(req, res){         
        var query_string = req.query; 
        var sort = {};
        var rep = {};

        if (!query_string) {
            rep.status = 0;
            rep.error = i18nm.__("invalid_query");
            return res.send(JSON.stringify(rep));
        }

        if (!query_string.id) {
            rep.status = 0;
            rep.error = i18nm.__("invalid_query");
            return res.send(JSON.stringify(rep));
        }

        var find_query = {
            _id : new ObjectId(req.query.id)
        };       

        app.get('mongodb').collection('types').find(find_query)        
            .sort(sort).toArray(function(err, items) {
                if(items && items.length && items.length==1){
                    // Return results
                    rep.status = 1;
                    rep.data = items[0];                    
                    return res.send(JSON.stringify(rep));
                }
            });   
    });

    router.get('/data/load',function(req, res){
        var find_query = {};        
        var sort = {};
        var rep = {};
        rep.items = [];
        app.get('mongodb').collection('types').find(find_query).sort(sort).toArray(function(err, items) {
            if (!err && items && items.length) {
                for (var i = 0; i < items.length; i++) {                   
                    rep.items.push(items[i]);
                }
            }

            // Return results
            rep.status = 1;
            res.send(JSON.stringify(rep));
        }); // data
    });

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

        if (!types_data.name) {
            rep.status = 0;
            rep.error = i18nm.__("invalid_query");
            return res.send(JSON.stringify(rep));
        }

        if (!types_data.namespace) {
            rep.status = 0;
            rep.error = i18nm.__("invalid_query");
            return res.send(JSON.stringify(rep));
        }

         if (!types_data.displayName) {
            rep.status = 0;
            rep.error = i18nm.__("invalid_query");
            return res.send(JSON.stringify(rep));
        }

        var query = {
            name: types_data.name,
            namespace: types_data.namespace,
        };       

        app.get('mongodb').collection('types').find(query).count(function(err, items_count) {
             if (!err && items_count > 0) {
                 if(items_count == 1){   
                    types_data._id = new ObjectId(types_data._id);                 
                    app.get('mongodb').collection('types').update({
                        _id: new ObjectId(types_data._id)
                    }, types_data, {w:1}, function(err, r) {
                        console.log(err,r);
                        if(!err){
                            rep.status = 1;
                            return res.send(JSON.stringify(rep));
                        }                        
                    });
                 }                                               
             }else{                
                types_data._id = new ObjectId()                                
                app.get('mongodb').collection('types').insert(types_data, function(err){
                    if (err) {
                        rep.status = 0;
                        rep.error = i18nm.__("invalid_query");                        
                        return res.send(JSON.stringify(rep));
                    }
                });                
             }
        });        
    });

    return router;
};