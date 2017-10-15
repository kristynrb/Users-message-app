const express = require('express'),
      router = express.Router(),
      User = require('../models/users.js');

// registration page
router.get('/new', (req, res) => {
    res.render('users/new.ejs');
});

// create a new user
router.post('/', (req, res) => {
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

// Get private messages
router.get('/:id', (req, res) => {
  if (req.session.currentuser._id == req.params.id) {
    User.findById(req.params.id, (err, foundUser) => {
      res.render('messages/private.ejs', {
        user: foundUser,
        currentUser: req.session.currentuser,
        requestedID: req.params.id
      });
    })
  } else {
    res.redirect('/');
  }
});

module.exports = router;
