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
            
            _ro.auth = _default_auth_data;            
            _ro._lang = i18nm;                        
            _ro.layout = path.join(_root, _base , '/layouts/', _layout);
            if (req && req.session && req.session.auth) _ro.auth = req.session.auth;
            
            res.render(_vp, _ro);
         },
         render_file: function(dir, filename, data, req) {
            var _ro = data || {};

         }         
     };

     return renderer;
};