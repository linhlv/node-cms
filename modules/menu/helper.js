module.exports = function(app, req) {
    var helpers = {}, _ = require('lodash');

    helpers.menu = function(callback){
        var lng = req.session.current_locale;

        app.get('mongodb').collection('menu').find({
            lang: lng
        }, {
            limit: 1
        }).toArray(function(err, items) {
            if (items && items.length && items[0].menu_source) {
                var tree = items[0].menu_source;
                try {
                    tree = JSON.parse(tree);
                } catch (er) {
                    tree = undefined;
                }
                if (tree) {
                    var html = '';

                    _.forEach(tree, function(item, index){
                        if(item.text && item.data && item.data.url){                            
                            html+= '<li><a href="' + item.data.url + '">' + item.text + '</a><li>';
                        }                        
                    });

                    return callback(html);
                }
            }
        });

        return callback();
    };

    helpers.x = function(callback){
        return callback('helpers:x');
    };

    return helpers;
};