var express = require('express');
var router = express.Router();

// registration page
router.get('/new', function(req, res){
    res.render('users/new.ejs');
});

module.exports = router;
