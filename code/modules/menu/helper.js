module.exports = function(app, req) {
    var helpers = {}, _ = require('lodash');

    function getNestedChildren(arr, parent){
        var out = []
        for(var i in arr) {          
            if(arr[i].parent == parent) {
                var children = getNestedChildren(arr, arr[i].id)
                if(children.length) {
                    arr[i].children = children
                }

                out.push(arr[i])
            }
        }
        return out;
    }

    function buildList(data, isSub){
        var html = '';                
        html += (isSub)?'<ul class="dropdown-menu">':'';        
        for(item in data){            
            if(typeof(data[item].children) === 'object'){ // An array will return 'object'
                html += '<li class="dropdown">';               
                html += '   <a href="#" class="dropdown-toggle " data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false">' + data[item].text + ' <b class=" icon-angle-down"></b></a>';
                if(isSub){} else { /* Submenu found, but top level list item. */}
                html += buildList(data[item].children, true); // Submenu found. Calling recursively same method (and wrapping it in a div)
            } else {
                html += '<li>';
                html += '<a href="' + data[item].data.url + '">' + data[item].text + '</a>'; // No submenu
            }

            html += '</li>';
        }

        html += (isSub)?'</ul>':'';
        
        return html;
    }

    helpers.li = function(callback){
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
                    
                    var nested = getNestedChildren(tree, '#');                   
                    
                    html = buildList(nested, false);

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