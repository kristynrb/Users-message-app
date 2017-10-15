const express = require('express'),
      router = express.Router(),
      User = require('../models/users.js')

// registration page
router.get('/new', function(req, res){
    res.render('users/new.ejs');
});

router.post('/', function(req, res){
    User.create(req.body, (err, createdUser) => {
        req.session.currentuser = createdUser;
        req.session.logged = true;
        res.redirect('/welcome');
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

router.get('/:id', (req, res) => {
  res.render('messages/private.ejs');
});

module.exports = router;
