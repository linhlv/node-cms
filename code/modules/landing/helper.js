module.exports = function(app, req) {
    var helpers = {}, _ = require('lodash');

    helpers.product_menu = function(callback){        
        var restClient = app.get('client'), rep = {}, html = '';

        // direct way
        restClient.get("http://staging.mk.labs.appiume.com/category/getmenu", function (data, response) {
            html +='<li class="dropdown dropdown-large">';
            html +='    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Products <b class="caret"></b></a>';
            html +='    <ul class="dropdown-menu dropdown-menu-large">';
            if(data){
                for(var i=0;i < data.length;i++){
                    html +='        <li class="col-sm-3">';
                    html +='            <ul>';
                    html +='                <li class="dropdown-header">' + data[i].name + '</li>';
                        for(var j=0;data[i].materials && j < data[i].materials.length;j++){ 
                            html +='                <li class="dropdown-header"><a href="/products/' + data[i].id +  '/' + data[i].materials[j].id + '">' + data[i].materials[j].name + '</a></li>';                    
                        }
                    html +='            </ul>';
                    html +='        </li>';
                }
                
            }else{

            }

            html +='    </ul>';
            html +='</li>';
            return callback(html); 
        });

        //return callback('t');        
    };

    return helpers;
};