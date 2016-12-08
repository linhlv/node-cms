var crypto = require('crypto'),
    config = require('../../config'),
    mongoclient = require('mongodb').MongoClient;

var mongo_url = config.mongo.url;

 mongoclient.connect(mongo_url, config.mongo_options, function(err, _db) {     
    if(!err){
        // Create default values
        _db.collection('users').remove({
            username: 'admin'
        }, function() {
            var password_md5 = crypto.createHash('md5').update(config.salt + '.admin').digest('hex');
            _db.collection('users').insert({
                username: 'admin',
                username_auth: 'admin',
                email: 'default@appiume.com',
                realname: 'Website Administrator',
                status: 2,
                regdate: Date.now(),
                password: password_md5
            }, function(_err) {
                if(_err){
                    console.log('Error:', _err);
                    return;
                }

                console.log('Done!')
            });
        });

        return;
    }   

    console.log(err);
 });

