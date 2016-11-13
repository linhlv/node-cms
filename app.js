
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