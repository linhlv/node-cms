module.exports = function(app, req) {
    var helpers = {}, _ = require('lodash');

    helpers.auth_menu = function(callback){
        var html = '';                   

        if(!req.session || !req.session.auth){
            html += '<ul class="nav navbar-nav navbar-right nav-margin">';                             
            html += '   <li>';
            html += '       <a href="/auth/">Login</a>';
            html += '   </li>';            
            html += '   <li>';
            html += '       <a href="/request">Request Full Catalogue</a>';
            html += '   </li>';
            html += '</ul>';            
        }else{
            html += '<ul class="nav navbar-nav navbar-right nav-margin">';                             
            html += '   <li>';
            html += '       <a href="/auth/logout">Logout</a>';
            html += '   </li>';            
            html += '</ul>';     
        }

        return callback(html);
    };

    return helpers;
};