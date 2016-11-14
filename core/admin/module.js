module.exports = function(app) {
     var router = app.get('express').Router();
          
     router.get('/', function(req, res) {
         console.log('sdfsf');
         res.send('hello admin');
         res.end();
     });

     return router;
};