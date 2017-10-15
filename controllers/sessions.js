const express = require('express'),
      router = express.Router(),
      User = require('../models/users.js');

router.get('/new', function(req, res){
    res.render('sessions/new.ejs');
});

router.post('/', function(req, res){
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if(req.body.password == foundUser.password){
            req.session.currentuser = foundUser;
            res.redirect('/welcome');
        } else {
            res.send('wrong password');
        }
    });
});

module.exports = router;
