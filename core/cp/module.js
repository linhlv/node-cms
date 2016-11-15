module.exports = function(app) {
     var router = app.get('express').Router(),
         renderer = app.get('renderer'),
         path = require('path'),
         config = app.get('config'),
         os = require('os'),
         fs = require('fs'),
         i18nm = new(require('i18n-2'))({
            locales: app.get('config').locales.avail,
            directory: path.join(__dirname, 'lang'),
            extension: '.js',
            devMode: app.get('config').locales.dev_mode
         }),
         viewsBasePath = 'core/cp/views';
          
     router.get('/', function(req, res) {
        i18nm.setLocale(req.session.current_locale);

        var loadavg = os.loadavg();

        if (loadavg[0] === 0 && loadavg[1] === 0 && loadavg[2] === 0) {
               loadavg = i18nm.__("not_available");
        } else {
               loadavg = loadavg[0] + ", " + loadavg[1] + ", " + loadavg[2];
        }

        var os_data = {
            hostname: os.hostname(),
            os_type: os.type(),
            os_platform: os.platform(),
            cpu_arch: os.arch(),
            os_release: os.release(),
            totalmem: parseInt(os.totalmem() / 1024 / 1024) + ' ' + i18nm.__('MB'),
            freemem: parseInt(os.freemem() / 1024 / 1024) + ' ' + i18nm.__('MB'),
            loadavg: loadavg
        };

         var data = {             
             assets : 'core/cp',
             os: os_data,
         };

         app.get('cp').render(req, res, data, i18nm, 'home', req.session.auth);
     });

     router.get('/spa_metadata.json', function(req, res) {
        var spa = app.get('spa');
        if(spa && spa.modules){            
            app.get('modules').forEach(function(module) {
                var _mp = path.join(__dirname, '../../modules', module, '/');                                
                if (fs.existsSync(_mp + 'admin.js')) {
                    var _a = require(_mp + 'admin')(app);
                    if(_a.spa){                        
                        spa.modules[module].displayName  = _a.get_module_name(req);
                    }                    
                }                                        
            });

            res.json(spa);
        }
     });

     return router;
};