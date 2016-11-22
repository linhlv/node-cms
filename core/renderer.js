var config = require('../config'),    
    fs = require('fs'),    
    async = require('async'),
    path = require('path'),
    _default_auth_data = {
        username: '',
        email: '',
        status: 0,
        realname: ''
    };

module.exports = function(app) {
    var i18nm = new(require('i18n-2'))({
            locales: config.locales.avail,
            directory: path.join(__dirname, 'lang'),
            extension: '.js',
            devMode: config.locales.dev_mode
        }),
        templates = {}, 
        _base = '',_root = app.get('_root');

    var _wrap = function(ro){
        ro.auth = _default_auth_data;        
        ro.assets = '/core/cp';
        ro.mp = '/modules/' + ro.m;
        ro._lang = i18nm;
    };

    var renderer = {
         dir: function(base){
             _base = base;
             return {render: this.render};
         },         
         render: function(req, view, layout, data, res) {             
            var _ro = data || {};
            var _layout = (layout || config.layouts.default) + '_' + req.session.current_locale;
            var _vp = path.join(_root, _base, view);            
            
            i18nm.setLocale(req.session.current_locale);            
            
            _wrap(_ro);

            _ro.layout = path.join(_root, _base , '/layouts/', _layout);
            
            if (req && req.session && req.session.auth) _ro.auth = req.session.auth;
            
            res.render(_vp, _ro);
         },
         render_file: function(dir, filename, data, req) {
            var _ro = data || {};
            var _layout = dir + '/' + filename + '.hbs';

            i18nm.setLocale(req.session.current_locale);     
            
            _wrap(_ro);

            if (req && req.session && req.session.auth) _ro.auth = req.session.auth;

            var source = fs.readFileSync(_layout, 'utf-8');      
            var hbs = app.get('hbs');
            hbs.handlebars.registerHelper('lang', function(key){                
                return data.lang.__(key); 
            });            
            var template = hbs.handlebars.compile(source);
            var html = template(_ro);

            return html;
         }         
     };

     return renderer;
};