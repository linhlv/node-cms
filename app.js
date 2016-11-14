
/* Load libraries */
var express = require('express'),
    cookieParser = require('cookie-parser'),
    config = require('./config'),
    fs = require('fs'),
    config_auth = require('./config_auth'),
    version = require('./version');

config.cms = version.cms;

var path = require('path'),
    crypto = require('crypto'),
    I18n = require('i18n-2'),
    app = express(),    
    session = require('express-session'),
    exphbs = require('express-handlebars'),
    mongoclient = require('mongodb').MongoClient,
    redis, redis_client, RedisStore, MongoStore;
if (config.redis.active) {
    redis = require("redis");
    redis_client = redis.createClient(config.redis.port, config.redis.host, {
        return_buffers: false
    });
    RedisStore = require('connect-redis')(session);
} else {
    MongoStore = require('connect-mongo')(session);
}

var winston = require('winston'),
    multer = require('multer'),
    bodyParser = require('body-parser');


/* Enable trusted proxy */
app.enable('trust proxy');

/* Logging */
var logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)(config.log.console),
        new(winston.transports.File)(config.log.file)
    ]
});
logger.exitOnError = false;

/* Redis events handler */
app.set('redis_connected', false);

if (redis_client) {
    redis_client.on("connect", function(err) {
        app.set('redis_connected', true);
    });
    redis_client.on("error", function(err) {
        app.set('redis_connected', false);
    });
}


/* Set variables */
app.set('config', config);
app.set('config_auth', config_auth);
app.set('express', express);
app.set('logger', logger);
app.set('views', path.join(__dirname, 'views'));
app.set('session', session);
app.engine('.hbs', exphbs({defaultLayout: '../' + config.layouts.default, extname: '.hbs'}));
app.set('view engine', '.hbs');

/* Use items */
app.use(multer({
    dest: config.dir.tmp + '/',
    rename: function(fieldname, filename) {
        return Date.now() + '_' + filename.replace(/\W+/g, '-').toLowerCase();
    },
    onError: function(error, next) {
        console.log(error);
        next(error);
    }
}));


app.use(cookieParser(config.cookie.secret));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/* Load static */
app.use(express.static(path.join(__dirname, 'public')));

/*
if (!app.get('blocks')) {
    app.set('blocks', {});
    app.set('blocks_sync', {});
}
*/


/* Get modules list and version info */
var modules = fs.readdirSync(path.join(__dirname, 'modules/')),
    version_info = {
        core: config.cms
    };

for (var mt in modules)
    if (!fs.lstatSync(path.join(__dirname, 'modules', modules[mt])).isDirectory()) modules.splice(mt);

app.set('modules', modules);

for (var mt in modules) {
    var installer = require(path.join(__dirname, 'modules', modules[mt], 'install'))(undefined, undefined, undefined);
    version_info[modules[mt]] = installer.version;
}

app.set('version_info', version_info);

/* Set static */
for (var md in modules) app.use(express.static(path.join(__dirname, 'modules/' + modules[md] + '/public')));

/* Locales */
I18n.expressBind(app, {
    locales: config.locales.avail,
    cookieName: config.cookie.prefix,
    directory: path.join(__dirname, 'core', 'lang'),
    extension: '.js',
    devMode: app.get('config').locales.dev_mode
});


/* Connect Redis or fallback to Mongo */
var _store;
if(config.redis.active && redis){
    _store = new RedisStore({
        client: redis_client,
        prefix: config.redis.prefix
    });
}else{
    _store = new MongoStore({
        url: config.mongo.url,
        auto_reconnect: false
    });
}

// Fix for old settings (should be 'destroy' instead of 'delete')
if (config.session.unset == 'delete') config.session.unset = 'destroy';
app.use(session({
    store: _store,
    httpOnly: false,
    secret: config.session.secret,
    cookie: {
        domain: config.cookie.domain,
        path: config.cookie.path,
        secure: config.cookie.secure,
        maxAge: config.cookie.maxAge
    },
    rolling: config.session.rolling,
    resave: config.session.resave,
    proxy: config.session.proxy,
    saveUninitialized: config.session.saveUninitialized,
    unset: config.session.unset
}));


/* Pre-load functions */
app.use(function(req, res, next) {
    if (typeof app.get('mongodb') == 'undefined' || !app.get('mongodb')) {       
        mongoclient.connect(config.mongo.url, config.mongo.options, function(err, _db) {       
            if (!err) {
                _db.on('close', function() {
                    app.set('mongodb', false);
                });
                app.set('mongodb', _db);
            } else {
                console.log(err);
                app.set('mongodb', false);
            }
            next();
        });
    } else {
        next();
    }
});

app.use(function(req, res, next) {
    var err;
    /* Check database connection */
    if (typeof app.get('mongodb') == 'undefined' || !app.get('mongodb')) {
        err = new Error(req.i18n.__("database_connection_failed"));
        err.status = 500;
        next(err);
        return;
    }
    if (redis && !app.get('redis_connected')) {
        err = new Error(req.i18n.__("redis_connection_failed"));
        err.status = 500;
        next(err);
        return;
    }
    /* Set locales from query and from cookie */
    if (app.get('config').locales.detect_from_cookie) req.i18n.setLocaleFromCookie();
    if (app.get('config').locales.detect_from_subdomain) req.i18n.setLocaleFromSubdomain();
    if (app.get('config').locales.detect_from_query) req.i18n.setLocaleFromQuery();
    /* Logging */
    logger.info(req.ip + " " + res.statusCode + " " + req.method + ' ' + req.url, {});
    /* Clear auth_redirect if already authorized */
    if (req.session && req.session.auth) {
        delete req.session.auth_redirect;
    }
    next();
});


/* Load settings */
var _timestamp_settings_query = {};

app.use(function(req, res, next) {
    var _lng = req.i18n.getLocale();
    req.session.current_locale = _lng;
    if (_timestamp_settings_query._lng && Date.now() - _timestamp_settings_query._lng <= 60000) {
        next();
        return;
    }
    var find_query = {
        $or: [{
            olang: _lng
        }, {
            olang: ''
        }]
    };
    app.get('mongodb').collection('settings').find(find_query, {}).toArray(function(err, items) {
        if (typeof items != 'undefined' && !err) {
            var settings = {};
            for (var i = 0; i < items.length; i++) {
                settings[items[i].oname] = items[i].ovalue;
                _timestamp_settings_query._lng = Date.now();
            }
            app.set('settings', settings);
            next();
        }
    });
});

/* Admin Spaces */
var _ap = path.join(__dirname, 'core', 'admin', '/');
var _ar, _ap;

app.use(express.static(path.join(_ap, 'public'))); // public

if(fs.existsSync(_ap + 'routing.js')) _ar = require(_ap + 'routing');
if(fs.existsSync(_ap + 'module.js')) _am = require(_ap + 'module')(app);
if(_ar.prefix !== undefined && _am) app.use(_ar.prefix, _am);

/* Load modules */
for (var mb in modules) {
    var _b, _m, _a, _r = {
            prefix: ''
        },
        _mp = path.join(__dirname, 'modules', modules[mb], '/');
    if (fs.existsSync(_mp + 'routing.js')) _r = require(_mp + 'routing');
    app.set(modules[mb] + '_routing', _r);

    /*
    if (fs.existsSync(_mp + 'block.js')) _b = require(_mp + 'block')(app);
    if (_b && _b.data) app.get('blocks')[modules[mb]] = _b.data;
    if (_b && _b.data_sync) app.get('blocks_sync')[modules[mb]] = _b.data_sync;
    */

    if (fs.existsSync(_mp + 'module.js')) _m = require(_mp + 'module')(app);
    if (fs.existsSync(_mp + 'admin.js')) _a = require(_mp + 'admin')(app);
    if (_m && _r.prefix !== undefined) app.use(_r.prefix, _m);
    if (_r.cp_prefix && _a) app.use(_r.cp_prefix, _a);
}

/* Error 404 (not found) */
app.use(function(req, res, next) {
    var err = new Error(req.i18n.__("pagenotfound"));
    err.status = 404;
    next(err);
});

/* Error handler */
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    var _data = {
        method: req.method,
        url: req.url,
        ip: req.ip,
        stack: err.stack,
        statusCode: res.statusCode
    };
    if (!config.log.stack || err.status == 404) delete _data.stack;
    if (!err.message) err.message = "Internal server error";
    if (!err.status) err.status = 500;
    logger.error(err.message, _data);
    if (res.statusCode != 404) console.log("\n" + err.stack + "\n");
    var site_title = 'Node CMS';
    if (app.get('settings') && app.get('settings').site_title) site_title = app.get('settings').site_title;
    var error_template = 'error';
    if (fs.existsSync(path.join(__dirname, 'views', 'custom_error.html'))) error_template = 'custom_error';
    console.log(error_template);
    res.render(error_template, {
        site_title: site_title,
        data: _data,
        err: err
    });
});

module.exports = app;