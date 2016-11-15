
define([], function(){ 
    $.get('/cp/spa_metadata.json', function(metadata){
        console.log(metadata);

    });
});