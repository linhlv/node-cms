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
        crypto = require('crypto'),
        config = require('../../config'),
        parser = app.get('parser'),
        mailer = app.get('mailer'),        
        async = require('async');
        
    router.spa = true;

    router.get_module_name = function(req) {
        i18nm.setLocale(req.session.current_locale);
        return i18nm.__("module_name");
    };

    router.get('/requests', function(req, res, next) {
        var find_query = {confirmed: true}, sort = {}, rep = {};
        app.get('mongodb').collection('requests').find(find_query)        
            .sort(sort).toArray(function(err, items) {
                if(items && items.length ){
                    // Return results
                    rep.status = 1;
                    rep.items = items;                    
                    return res.send(JSON.stringify(rep));
                }else{
                    rep.status = 0;
                    rep.message = 'Not found!';                    
                    return res.send(JSON.stringify(rep));
                }
            });   
    });

    router.post('/approve_request', function(req, res, next) {
        var find_query = {}, sort = {}, rep = {};
        var posting_data = req.body;
        if(!posting_data){
            rep.status = 0;
            rep.error = 'Data not found!';
            return res.send(JSON.stringify(rep));
        }

        if (!posting_data._id) {
            rep.status = 0;
            rep.error = 'Data fields are missing!';
            return res.send(JSON.stringify(rep));
        }

        find_query._id =  new ObjectId(posting_data._id);
        find_query.confirmed = true;
        find_query.approved = false;

        app.get('mongodb').collection('requests').find(find_query, {
            limit: 1
        }).toArray(function(err, items) {
            if (typeof items != 'undefined' && !err) {
                if (items.length > 0) {
                    var update = items[0];

                    update.approved = true;  
                    update.password = app.get('utils').generatePassword(6);                           

                    app.get('mongodb').collection('requests').update({
                        _id: new ObjectId(posting_data._id)
                    }, update, function() {
                         var password_md5 = crypto.createHash('md5').update(config.salt + '.' + update.password).digest('hex');
                         app.get('mongodb').collection('users').insert({
                            username: update.email,
                            username_auth: update.email,
                            email: update.email,
                            realname: update.name,
                            status: 1,
                            regdate: Date.now(),
                            password: password_md5
                        }, function(_err) {
                            if(_err){ return; }     

                            var login_url = config.protocol + '://' + req.get('host') + '/auth/';
                            mailer.send(update.email, 'Request full catalogue: MK Handicraft', path.join(__dirname, 'views'), 'mail_client_request_access_info_html', 'mail_client_request_access_info_text', {
                                lang: i18nm,
                                site_title: app.get('settings').site_title,
                                password: update.password,
                                login_url: login_url
                            }, req, function(error) {
                                if(!error){
                                    // Success                
                                    rep.status = 1;
                                    rep.updated = update;
                                    return res.send(JSON.stringify(rep));
                                }                                                                    
                            });                                                      
                        });
                    });
                }
            } else {
                rep.status = 0;
                rep.error = i18nm.__("id_not_found");
                res.send(JSON.stringify(rep));
            }
        });      
    });

    return router;
};