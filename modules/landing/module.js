module.exports = function(app) {
    var router = app.get('express').Router(),
        path = require('path'),
        exphbs = app.get('exphbs'),  
        renderer = app.get('renderer'),
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

  

    return router;
};