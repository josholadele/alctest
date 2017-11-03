var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    // res.send('Hello World');
    res.render('index.html')
});

router.get('/create',function(req,res,next){
    // res.send('Hello World');
    res.render('create.html')
});  

module.exports = router;