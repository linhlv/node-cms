module.exports = function(app) {
    var cp = {
        render: function(req, res, data, i18nm, current, auth) {
            var path = require('path'),
                i18ncp = new(require('i18n-2'))({
                    locales: app.get('config').locales.avail,
                    directory: path.join(__dirname, '..', 'cp', 'lang'),
                    extension: '.js',
                    devMode: app.get('config').locales.dev_mode
                }),
                _ro = data || {}, 
                renderer = app.get('renderer'),
                viewsBasePath = 'core/cp/views';

            i18ncp.setLocale(req.session.current_locale);
            var modules = [];
            app.get('modules').forEach(function(module) {                
                if (app.get(module + '_routing').cp_prefix && app.get(module + '_routing').cp_prefix.length) {
                    var _am = require('../../modules/' + module + '/admin')(app);
                    var _m = {};
                    _m.prefix = app.get(module + '_routing').cp_prefix;
                    _m.name = _am.get_module_name(req);
                    _m.id = app.get(module + '_routing').cp_id;
                    if (!app.get(module + '_routing').hidden) modules.push(_m);
                }
            });

            _ro.lang = i18nm;
            _ro.cp_lang = i18ncp;
            _ro.username = auth.realname || auth.username;                                    
            _ro.modules = JSON.stringify(modules);         
            _ro.active_module = current;
            
            if(auth){ _ro.username = auth.realname || auth.username; }

            var render = app.get('renderer').render_file(path.join(__dirname, 'views'), 'admin', _ro, req);
            
            res.send(render);            
        }
    };
    return cp;
};
