var app = require('./app');
var mailer = require('./core/mailer')(app);
mailer.simpleSend();