var config = require('../config'),
    version = require('../version');

var app = require('../app'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    crypto = require('crypto'),
    port = config.port || process.env.PORT || 3000,
    redis_client = app.get('redis_client'),
    ObjectId = require('mongodb').ObjectID,
    redis_subscriber;

if (config.redis.active) {
    var _redis = require("redis");
    redis_subscriber = _redis.createClient(config.redis.port, config.redis.host, {
        return_buffers: false
    });
    redis_subscriber.subscribe(config.redis.prefix + 'medved_ipc');
    redis_subscriber.subscribe(config.redis.prefix + 'medved_broadcast');
    redis_subscriber.on("message", function(channel, message) {
        if (channel && channel == config.redis.prefix + 'medved_ipc' && message && message.length) {
            var msg = JSON.parse(message);
            if (!msg) return;
            if (io && io.sockets.connected[msg.session]) io.sockets.connected[msg.session].emit(msg.msgtype, msg.msg);
        }
        if (channel && channel == config.redis.prefix + 'medved_broadcast' && message && message.length) {
            var bmsg = JSON.parse(message);
            if (!bmsg) return;
            for (var key in io.sockets.connected)
                if (io && io.sockets.connected[key]) io.sockets.connected[key].emit(bmsg.msgtype, bmsg.msg);
        }
    });
    redis_subscriber.on("connect", function(err) {
        app.set('redis_connected', true);
    });
    redis_subscriber.on("error", function(err) {
        app.set('redis_connected', false);
    });
}


var server = http.listen(port, function() {
    if (config.gid) process.setgid(config.gid);
    if (config.uid) process.setuid(config.uid);
    console.log('[%s] server listening on port x: ' + port, process.pid);
});