module.exports = function(app) {
    var router = app.get('express').Router(),
        path = require('path'),
        exphbs = app.get('exphbs'),  
        renderer = app.get('renderer'),
        mailer = app.get('mailer'),
        ObjectId = require('mongodb').ObjectID,
        config = app.get('config'),
        crypto = require('crypto'),
        i18nm = new(require('i18n-2'))({
            locales: app.get('config').locales.avail,
            directory: path.join(__dirname, 'lang'),
            extension: '.js',
            devMode: app.get('config').locales.dev_mode
        }), baseTitle = 'MK Handicrafts',
        restClient = app.get('client');          
    
    var rootRestUrl = 'http://crm.mkhandicrafts.com';
    //var rootRestUrl = 'http://192.168.1.6';

    var renderLanding = function(req, layout, data, res){
        restClient.get(rootRestUrl + '/material/getmenu', function (_data, response) {
            data.menu =  _data;  
            return app.get('renderer').render(req, layout, data, res);
        });   
    };
    
    router.get('/', function(req, res, next) {
        var data = {
                title: baseTitle + ' - Home',
                page_title:'module_name',
                keywords: '',
                description: '',
                auth: req.session ? req.session.auth : null,
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
        
        return renderLanding(req, undefined, data, res);
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
        
        return renderLanding(req, undefined, data, res);
    });    

    router.get('/rest/categories', function(req, res, next) {
        var rep = {};

        // direct way
        restClient.get(rootRestUrl + '/materials/getmenu', function (data, response) {
            rep.status = 1;
            rep.data = data;
            return res.send(JSON.stringify(rep));
        });        
    });


    router.get('/product-item/:id', function(req, res, next) {        
        var data = {
            title: baseTitle + ' - Products',
            page_title:'module_name',
            baseUrl: rootRestUrl,
            auth: req.session ? req.session.auth : null,
            keywords: '',
            description: '',
            extra_css: '<link rel="stylesheet" href="/modules/support/css/frontend.css" type="text/css">'
        };          
        
        if(req && req.params.id){            
             restClient.get(rootRestUrl + '/product/getproduct/' +  req.params.id , function (d, cresponse) {
                    var data = {
                        title: baseTitle + ' - Product Details',
                        page_title:'module_name',
                        keywords: '',              
                        description: '',
                        details: d,
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
                    
                    return renderLanding(req, undefined, data, res);
             });           
        }else{ }        
    });


    router.get('/products/:mat/:page', function(req, res, next) {        
        var data = {
                title: baseTitle + ' - Products',
                page_title:'module_name',
                baseUrl: rootRestUrl,
                auth: req.session ? req.session.auth : null,
                keywords: '',
                description: '',
                extra_css: '<link rel="stylesheet" href="/modules/support/css/frontend.css" type="text/css">'
            };

        if (typeof req.session.auth == 'undefined' || req.session.auth === false || req.session.auth.status < 1) {
            if(req && req.params && req.params.page && req.params.page > 1){
                var body = renderer.render_file(path.join(__dirname, 'views'), 'products', {
                    lang: i18nm,
                    data: data,
                    status_list: JSON.stringify(i18nm.__('status_list')),
                    prio_list: JSON.stringify(i18nm.__('prio_list')),
                    current_locale: req.session.current_locale
                }, req);

        
                data.body = body;
                
                return renderLanding(req, undefined, data, res);
            }            
        }  
        
        
        if(req && req.params.mat){
            var page = req.params.page ? parseInt(req.params.page) : 1,
            itemsPerPage = 10,
            q = '?material=' + req.params.mat + '&page=' + page + '&itemsPerPage=' + itemsPerPage;    
            restClient.get(rootRestUrl + '/material/get?id=' + req.params.mat , function (m, mresponse) {
                data.materialName = m.Name;                                
                restClient.get(rootRestUrl + '/product/search' + q, function (d, response) {                    
                    if(d && d.data){
                        data.paging = {
                            currentPage : page,
                            totalProductsCount : d.totalCount,
                            pageNumbers : []
                        };

                        data.paging.pages = Math.ceil(d.totalCount / itemsPerPage);

                        if(data.paging.pages > 1){
                            data.paging.show = true;

                            for(var i=0;i < data.paging.pages;i++){
                                data.paging.pageNumbers.push({
                                    p: i+1,
                                    current: (i+1) == page,
                                    link: '/products/' + req.params.mat + '/' + (i+1)
                                });
                            }

                            data.paging.next = (page < data.paging.pages) ? (page + 1) : '#';
                            data.paging.previous = (page > 1) ? (page - 1) : '#';
                        }                       

                        data.products = [];

                        for(var i=0;i< d.data.length;i++){
                            var obj = d.data[i];
                            obj.imageUrl = rootRestUrl +  '/Images?filename=' + obj.productImages[0].imageFileUrl + '&w=360&h=360';
                            data.products.push(obj);
                        }

                        var body = renderer.render_file(path.join(__dirname, 'views'), 'products', {
                            lang: i18nm,
                            data: data,
                            status_list: JSON.stringify(i18nm.__('status_list')),
                            prio_list: JSON.stringify(i18nm.__('prio_list')),
                            current_locale: req.session.current_locale
                        }, req);

                
                        data.body = body;
                        
                        return renderLanding(req, undefined, data, res);
                    }else{
                        var body = renderer.render_file(path.join(__dirname, 'views'), 'products', {
                            lang: i18nm,
                            data: data,
                            status_list: JSON.stringify(i18nm.__('status_list')),
                            prio_list: JSON.stringify(i18nm.__('prio_list')),
                            current_locale: req.session.current_locale
                        }, req);

                
                        data.body = body;
                        
                        return renderLanding(req, undefined, data, res);
                    }             
                });
            });           
        }else{

        }        
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
        
        return renderLanding(req, undefined, data, res);
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
        
        return renderLanding(req, undefined, data, res);
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
        
        return renderLanding(req, undefined, data, res);
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
        
        return renderLanding(req, undefined, data, res);
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
        
        return renderLanding(req, undefined, data, res);
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

        return renderLanding(req, undefined, data, res);
    });  

     router.get('/landing/confirm', function(req, res, next) {        
        // Fields validation
        var query_data = req.query,
        data = {
            title: baseTitle + ' - Request Full Catalogue',
            page_title:'module_name',
            keywords: '',
            description: '',
            extra_css: '<link rel="stylesheet" href="/modules/support/css/frontend.css" type="text/css">'
        };
        
        if (!query_data || !query_data.id || !query_data.code) {
            data.status = 0;
            data.error = 'Data not found!';  

            data.body = renderer.render_file(path.join(__dirname, 'views'), 'confirm_email', {
                lang: i18nm,
                data: data,
                status_list: JSON.stringify(i18nm.__('status_list')),
                prio_list: JSON.stringify(i18nm.__('prio_list')),
                current_locale: req.session.current_locale
            }, req); 
            
            return app.get('renderer').render(req, undefined, data, res);
        }
        
        var find_query = {
            _id : new ObjectId(query_data.id),            
            confirmCode: query_data.code
        };          

        app.get('mongodb').collection('requests').find(find_query, {
            limit: 1
        }).toArray(function(err, items) {            
            if (typeof items != 'undefined' && !err) {
                if (items.length == 1) {
                    var update = items[0];
                    if(update.confirmed){
                        //confirmed
                        data.confirmed = true;     

                        data.body = renderer.render_file(path.join(__dirname, 'views'), 'confirm_email', {
                            lang: i18nm,
                            data: data,
                            status_list: JSON.stringify(i18nm.__('status_list')),
                            prio_list: JSON.stringify(i18nm.__('prio_list')),
                            current_locale: req.session.current_locale
                        }, req);   
                        
                        return renderLanding(req, undefined, data, res);   
                    }

                    //confirming
                    update.confirmed = true;

                    app.get('mongodb').collection('requests').update({
                        _id: new ObjectId(query_data.id)
                    }, update, function(_err) {                        
                        if(_err){ return; }
                        
                        data.confirmed = true;     

                        data.body = renderer.render_file(path.join(__dirname, 'views'), 'confirm_email', {
                            lang: i18nm,
                            data: data,
                            status_list: JSON.stringify(i18nm.__('status_list')),
                            prio_list: JSON.stringify(i18nm.__('prio_list')),
                            current_locale: req.session.current_locale
                        }, req);
                        
                        return renderLanding(req, undefined, data, res);          
                    });
                }else{
                    data.confirmed = false;     

                    data.body = renderer.render_file(path.join(__dirname, 'views'), 'confirm_email', {
                        lang: i18nm,
                        data: data,
                        status_list: JSON.stringify(i18nm.__('status_list')),
                        prio_list: JSON.stringify(i18nm.__('prio_list')),
                        current_locale: req.session.current_locale
                    }, req);   
                    
                    return renderLanding(req, undefined, data, res);
                }
            } else {                
                data.error = i18nm.__("id_not_found");
                
                data.body = renderer.render_file(path.join(__dirname, 'views'), 'confirm_email', {
                    lang: i18nm,
                    data: data,
                    status_list: JSON.stringify(i18nm.__('status_list')),
                    prio_list: JSON.stringify(i18nm.__('prio_list')),
                    current_locale: req.session.current_locale
                }, req); 
                
                return renderLanding(req, undefined, data, res);
            }
        });  
    });  
    

    router.post('/request', function(req, res, next) {   
        // Fields validation
        var posting_data = req.body, rep = {};
        
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
                        var md5 = crypto.createHash('md5');                           
                        var act_code = md5.update(config.salt + '.' + Date.now()).digest('hex');                        
                        posting_data._id = new ObjectId();
                        posting_data.createdOn = new Date();     
                        posting_data.confirmed = false;
                        posting_data.approved = false;
                        posting_data.confirmCode = act_code;

                        app.get('mongodb').collection('requests').insert(posting_data, function(create_requests_err){
                            if (create_requests_err) {
                                rep.status = 0;
                                rep.reason = {
                                    systemError: true
                                };
                                rep.error = 'There was an error while processing, please try again!';             
                                return res.send(JSON.stringify(rep));
                            }else{
                                // Send confirm mail                                     
                                var confirm_url = config.protocol + '://' + req.get('host') + '/landing/confirm?id=' + posting_data._id + '&code=' + act_code;
                                mailer.send(posting_data.email, 'Request full catalogue: MK Handicraft', path.join(__dirname, 'views'), 'mail_request_html', 'mail_request_txt', {
                                    lang: i18nm,
                                    site_title: app.get('settings').site_title,
                                    confirm_url: confirm_url
                                }, req, function(error) {
                                    if(!error){
                                        // Success
                                        rep.status = 1;
                                        return res.send(JSON.stringify(rep));
                                    }else{
                                        rep.status = 0;
                                        rep.error = 'Email configuration has error!';         
                                        return res.send(JSON.stringify(rep));
                                    }                                                                    
                                });                                
                            }
                        }); 
                    }
                });                               
             }
        });        
    }); 

    return router;
};