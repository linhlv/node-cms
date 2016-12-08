var crypto = require('crypto'),
    config = require('../../config'),
    ObjectId = require('mongodb').ObjectID,
    async = require('async'),
    mongoclient = require('mongodb').MongoClient;

var mongo_url = config.mongo.url;

 mongoclient.connect(mongo_url, config.mongo_options, function(err, db) {
     console.log('checking...');     
    if(!err){
        console.log('inserting...');
         db.collection('menu').insert({
            "lang": "en",
            "menu_source": "[{\"id\":\"j3_1\",\"text\":\"/\",\"data\":null,\"parent\":\"#\",\"type\":\"root\"},{\"id\":\"j3_2\",\"text\":\"Home\",\"data\":{\"url\":\"/\"},\"parent\":\"j3_1\",\"type\":\"folder\"},{\"id\":\"j3_3\",\"text\":\"Blog\",\"data\":{\"url\":\"/blog\"},\"parent\":\"j3_1\",\"type\":\"folder\"},{\"id\":\"j3_4\",\"text\":\"Social\",\"data\":{\"url\":\"/social\"},\"parent\":\"j3_1\",\"type\":\"folder\"},{\"id\":\"j3_5\",\"text\":\"Shop\",\"data\":{\"url\":\"/catalog\"},\"parent\":\"j3_1\",\"type\":\"folder\"},{\"id\":\"j3_6\",\"text\":\"Chat\",\"data\":{\"url\":\"/chat\"},\"parent\":\"j3_1\",\"type\":\"folder\"},{\"id\":\"j3_7\",\"text\":\"Support\",\"data\":{\"url\":\"/support\"},\"parent\":\"j3_1\",\"type\":\"folder\"},{\"id\":\"j3_8\",\"text\":\"Feedback\",\"data\":{\"url\":\"/feedback\"},\"parent\":\"j3_1\",\"type\":\"folder\"}]"
        }, function(_err) {
           if (_err) {
                console.log(_err);
                return;
            }

            console.log('done');
        });

        db.collection('menu').insert({
            "lang": "ru",
            "menu_source": "[{\"id\":\"j3_1\",\"text\":\"/\",\"data\":null,\"parent\":\"#\",\"type\":\"root\"},{\"id\":\"j3_2\",\"text\":\"Главная\",\"data\":{\"url\":\"/\"},\"parent\":\"j3_1\",\"type\":\"folder\"},{\"id\":\"j3_3\",\"text\":\"Блог\",\"data\":{\"url\":\"/blog\"},\"parent\":\"j3_1\",\"type\":\"folder\"},{\"id\":\"j3_4\",\"text\":\"Соц. сеть\",\"data\":{\"url\":\"/social\"},\"parent\":\"j3_1\",\"type\":\"folder\"},{\"id\":\"j3_5\",\"text\":\"Магазин\",\"data\":{\"url\":\"/catalog\"},\"parent\":\"j3_1\",\"type\":\"folder\"},{\"id\":\"j3_6\",\"text\":\"Чат\",\"data\":{\"url\":\"/chat\"},\"parent\":\"j3_1\",\"type\":\"folder\"},{\"id\":\"j3_7\",\"text\":\"Поддержка\",\"data\":{\"url\":\"/support\"},\"parent\":\"j3_1\",\"type\":\"folder\"},{\"id\":\"j3_8\",\"text\":\"Обратная связь\",\"data\":{\"url\":\"/feedback\"},\"parent\":\"j3_1\",\"type\":\"folder\"}]"
        }, function(_err) {
            if (_err) {
                console.log(_err);
                return;
            }

            console.log('done');
        });

        return;
    }  

    console.log(err);
 });

