module.exports = function(app) {
     var router = app.get('express').Router(),
         renderer = app.get('renderer'),
         path = require('path'),
         config = app.get('config'),
         os = require('os'),
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
             lang: i18nm,
             assets : 'core/cp',
             os: os_data,
         };

         renderer.dir(viewsBasePath).render(req, 'home', undefined, data, res);       
     });

     return router;
};