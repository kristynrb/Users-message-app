const express = require('express'),
      router = express.Router(),
      User = require('../models/users.js')

// registration page
router.get('/new', function(req, res){
    res.render('users/new.ejs');
});

router.post('/', function(req, res){
    User.create(req.body, function(err, createdUser){
        User.findOne({ username: req.body.username }, (err, foundUser) => {
                req.session.currentuser = foundUser;
                res.redirect('/welcome');
        });        
    });
});

// destory session
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
	    if(err){
	      console.log(err);
	    } else {
	      res.redirect('/');
	    }
  });
});

module.exports = router;
