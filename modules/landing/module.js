module.exports = function(app) {
    var router = app.get('express').Router(),
        path = require('path'),
        exphbs = app.get('exphbs'),  
        renderer = app.get('renderer'),
        ObjectId = require('mongodb').ObjectID,
        config = app.get('config'),
        i18nm = new(require('i18n-2'))({
            locales: app.get('config').locales.avail,
            directory: path.join(__dirname, 'lang'),
            extension: '.js',
            devMode: app.get('config').locales.dev_mode
        }), baseTitle = 'MK Handicrafts';          
    
    router.get('/', function(req, res, next) {
        var data = {
                title: baseTitle + ' - Home',
                page_title:'module_name',
                keywords: '',
                description: '',
                extra_css: '<link rel="stylesheet" href="/modules/support/css/frontend.css" type="text/css">'
            },carousel = renderer.render_file(path.join(__dirname, 'views'), 'carousel', {
                lang: i18nm,
                data: data,
                status_list: JSON.stringify(i18nm.__('status_list')),
                prio_list: JSON.stringify(i18nm.__('prio_list')),
                current_locale: req.session.current_locale
            }, req),
            body = renderer.render_file(path.join(__dirname, 'views'), 'index', {
                lang: i18nm,
                data: data,
                status_list: JSON.stringify(i18nm.__('status_list')),
                prio_list: JSON.stringify(i18nm.__('prio_list')),
                current_locale: req.session.current_locale
            }, req);

        data.carousel = carousel;
        data.body = body;
        
        return app.get('renderer').render(req, undefined, data, res);
    });

    router.get('/about', function(req, res, next) {        
        var data = {
                title: baseTitle + ' - About',
                page_title:'module_name',
                keywords: '',
                description: '',
                extra_css: '<link rel="stylesheet" href="/modules/support/css/frontend.css" type="text/css">'
            },            
            body = renderer.render_file(path.join(__dirname, 'views'), 'about', {
                lang: i18nm,
                data: data,
                status_list: JSON.stringify(i18nm.__('status_list')),
                prio_list: JSON.stringify(i18nm.__('prio_list')),
                current_locale: req.session.current_locale
            }, req);        
        data.body = body;
        
        return app.get('renderer').render(req, undefined, data, res);
    });

    router.get('/products', function(req, res, next) {        
        var data = {
                title: baseTitle + ' - Products',
                page_title:'module_name',
                keywords: '',
                description: '',
                extra_css: '<link rel="stylesheet" href="/modules/support/css/frontend.css" type="text/css">'
            },            
            body = renderer.render_file(path.join(__dirname, 'views'), 'products', {
                lang: i18nm,
                data: data,
                status_list: JSON.stringify(i18nm.__('status_list')),
                prio_list: JSON.stringify(i18nm.__('prio_list')),
                current_locale: req.session.current_locale
            }, req);        
        data.body = body;
        
        return app.get('renderer').render(req, undefined, data, res);
    });

    router.get('/product-item', function(req, res, next) {        
        var data = {
                title: baseTitle + ' - Product Details',
                page_title:'module_name',
                keywords: '',
                description: '',
                extra_css: '<link rel="stylesheet" href="/modules/support/css/frontend.css" type="text/css">'
            },            
            body = renderer.render_file(path.join(__dirname, 'views'), 'product-item', {
                lang: i18nm,
                data: data,
                status_list: JSON.stringify(i18nm.__('status_list')),
                prio_list: JSON.stringify(i18nm.__('prio_list')),
                current_locale: req.session.current_locale
            }, req);        
        data.body = body;
        
        return app.get('renderer').render(req, undefined, data, res);
    });

    router.get('/collection', function(req, res, next) {        
        var data = {
                title: baseTitle + ' - Collection',
                page_title:'module_name',
                keywords: '',
                description: '',
                extra_css: '<link rel="stylesheet" href="/modules/support/css/frontend.css" type="text/css">'
            },            
            body = renderer.render_file(path.join(__dirname, 'views'), 'collection', {
                lang: i18nm,
                data: data,
                status_list: JSON.stringify(i18nm.__('status_list')),
                prio_list: JSON.stringify(i18nm.__('prio_list')),
                current_locale: req.session.current_locale
            }, req);        
        data.body = body;
        
        return app.get('renderer').render(req, undefined, data, res);
    });

    router.get('/faq', function(req, res, next) {        
        var data = {
                title: baseTitle + ' - FAQs',
                page_title:'module_name',
                keywords: '',
                description: '',
                extra_css: '<link rel="stylesheet" href="/modules/support/css/frontend.css" type="text/css">'
            },            
            body = renderer.render_file(path.join(__dirname, 'views'), 'faq', {
                lang: i18nm,
                data: data,
                status_list: JSON.stringify(i18nm.__('status_list')),
                prio_list: JSON.stringify(i18nm.__('prio_list')),
                current_locale: req.session.current_locale
            }, req);        
        data.body = body;
        
        return app.get('renderer').render(req, undefined, data, res);
    });

    router.get('/contact', function(req, res, next) {        
        var data = {
                title: baseTitle + ' - Contact Us',
                page_title:'module_name',
                keywords: '',
                description: '',
                extra_css: '<link rel="stylesheet" href="/modules/support/css/frontend.css" type="text/css">'
            },            
            body = renderer.render_file(path.join(__dirname, 'views'), 'contact', {
                lang: i18nm,
                data: data,
                status_list: JSON.stringify(i18nm.__('status_list')),
                prio_list: JSON.stringify(i18nm.__('prio_list')),
                current_locale: req.session.current_locale
            }, req);        
        data.body = body;
        
        return app.get('renderer').render(req, undefined, data, res);
    });


    router.get('/login', function(req, res, next) {        
        var data = {
                title: baseTitle + ' - Login',
                page_title:'module_name',
                keywords: '',
                description: '',
                extra_css: '<link rel="stylesheet" href="/modules/support/css/frontend.css" type="text/css">'
            },            
            body = renderer.render_file(path.join(__dirname, 'views'), 'login', {
                lang: i18nm,
                data: data,
                status_list: JSON.stringify(i18nm.__('status_list')),
                prio_list: JSON.stringify(i18nm.__('prio_list')),
                current_locale: req.session.current_locale
            }, req);        
        data.body = body;
        
        return app.get('renderer').render(req, undefined, data, res);
    });
    
    router.get('/request', function(req, res, next) {        
        var data = {
                title: baseTitle + ' - Request Full Catalogue',
                page_title:'module_name',
                keywords: '',
                description: '',
                extra_css: '<link rel="stylesheet" href="/modules/support/css/frontend.css" type="text/css">'
            },            
            body = renderer.render_file(path.join(__dirname, 'views'), 'request', {
                lang: i18nm,
                data: data,
                status_list: JSON.stringify(i18nm.__('status_list')),
                prio_list: JSON.stringify(i18nm.__('prio_list')),
                current_locale: req.session.current_locale
            }, req);        
        data.body = body;
        
        return app.get('renderer').render(req, undefined, data, res);
    });

    router.post('/request', function(req, res, next) {   
        // Fields validation
        var posting_data = req.body,
        rep = {

        };
        
        if (!posting_data) {
            rep.status = 0;
            rep.error = 'Data not found!';
            return res.send(JSON.stringify(rep));
        }

        if (!posting_data.name
            || !posting_data.name
            || !posting_data.company
            || !posting_data.phone
            || !posting_data.email
            || !posting_data.message) {
            rep.status = 0;
            rep.error = 'Data fields are missing!';
            return res.send(JSON.stringify(rep));
        }

        var query = {
            email : req.body.email
        };

        app.get('mongodb').collection('requests').find(query).count(function(request_err, request_items_count) {
            if(request_err){
                rep.status = 0;
                rep.reason = {
                    systemError: true
                };
                rep.error = 'There was an error while processing, please try again!';
                return res.send(JSON.stringify(rep));
            }

            if (request_items_count == 1) {
                rep.status = 0;
                rep.reason = {
                    requestExisting: true
                };
                rep.error = 'Your email is used to request full catalogue we will feedback you soon or please contact our agent for support!';
                return res.send(JSON.stringify(rep));                           
            }else{            
                //find on user 
                app.get('mongodb').collection('users').find(query).count(function(user_err, user_items_count) {
                    if(user_err){
                        rep.status = 0;
                        rep.reason = {
                            systemError: true
                        };
                        rep.error = 'There was an error while processing, please try again!';
                        return res.send(JSON.stringify(rep));
                    }
                    
                    if(user_items_count == 1){
                        //user existing
                        rep.status = 0;
                        rep.reason = {
                            userExisting: true
                        };
                        rep.error = 'Your were already provided access information to view full catalogue or you my forgot your password, use forgot password feature!';
                        return res.send(JSON.stringify(rep));
                    }else{
                        posting_data._id = new ObjectId()                                
                        app.get('mongodb').collection('requests').insert(posting_data, function(create_requests_err){
                            if (create_requests_err) {
                                rep.status = 0;
                                rep.reason = {
                                    systemError: true
                                };
                                rep.error = 'There was an error while processing, please try again!';             
                                return res.send(JSON.stringify(rep));
                            }else{
                                rep.status = 1;
                                return res.send(JSON.stringify(rep));
                            }
                        }); 
                    }
                });                               
             }
        });        
    });

  

    return router;
};