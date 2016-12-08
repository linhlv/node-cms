var crypto = require('crypto'),
    config = require('../../config'),
    ObjectId = require('mongodb').ObjectID,
    mongoclient = require('mongodb').MongoClient;

var mongo_url = config.mongo.url;

 mongoclient.connect(mongo_url, config.mongo_options, function(err, _db) {     
    if(!err){

        _db.collection('pages').insert({
            "_id": new ObjectId('54d23755b91e307022edb199'),
            "pfilename": "",
            "pfolder": "/",
            "pfolder_id": "j1_1",
            "pdata": {
                "en": {
                    "ptitle": "Default page",
                    "pkeywords": "sample, keywords, here",
                    "pdesc": "This is the sample page",
                    "pcontent": "<p>Congratulations! The installation is complete.</p>\n\n<p>Get started the administration of your TaracotJS installation: <a href=\"/cp\">control panel</a> (username &quot;admin&quot;, password &quot;admin&quot; without quotes by default).</p>\n\n<p>You can get more info on using TaracotJS here:</p>\n\n<ul>\n\t<li><a href=\"https://taracot.org\">official website</a></li>\n\t<li><a href=\"https://github.com/xtremespb/taracotjs\">sources at GitHub</a></li>\n\t<li><a href=\"https://demo.taracot.org\">demo website</a></li>\n</ul>\n\n<p>Please don&#39;t hesitate to post any comments or bugs at GitHub website.</p>\n"
                },
                "ru": {
                    "ptitle": "Главная страница",
                    "pkeywords": "образец, ключевых, слов",
                    "pdesc": "Тестовая страница",
                    "pcontent": "<p>Поздравляем! Установка TaracotJS успешно выполнена.</p>\n\n<p>Начните управление Вашим сайтом, зайдя в <a href=\"/cp\">панель управления</a> (имя пользователя &quot;admin&quot;, пароль &quot;admin&quot; без кавычек по умолчанию).</p>\n\n<p>Больше информации о системе:</p>\n\n<ul>\n\t<li><a href=\"https://taracot.org\">официальный веб-сайт</a></li>\n\t<li><a href=\"https://github.com/xtremespb/taracotjs\">исходный код на GitHub</a></li>\n\t<li><a href=\"https://demo.taracot.org\">демонстрационный сайт</a></li>\n</ul>\n\n<p>Пожалуйста, не стесняйтесь отправлять Ваши замечания, пожалания и баги на GitHub.</p>\n"
                }
            }
        }, function(_err) {
            if(_err){
                    console.log('Error:', _err);
                    return;
                }

                console.log('Done!')
        });

        return;
    }   

    console.log(err);
 });

