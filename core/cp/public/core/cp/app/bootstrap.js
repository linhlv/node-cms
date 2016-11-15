
define([], function(){ 
    $.get('/cp/spa_metadata.json', function(metadata){
        if(metadata && metadata.modules){
            _.forEach(metadata.modules, function(m){
                console.log(m);
            });
        }
    });
});