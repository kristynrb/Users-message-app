const express = require('express'),
      router = express.Router(),
      User = require('../models/users.js');

//LOGIN
router.get('/new', function(req, res){
    res.render('sessions/new.ejs');
});

//CREATE A NEW SESSION
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

// LOGOUT OF SESSION
router.get('/logout', function(req, res){
    req.session.logged = false;
    res.redirect('/');
});

module.exports = router;
