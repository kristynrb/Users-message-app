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

// Get public messages
router.get('/messages', (req, res) => {
  if (req.session.logged){
    res.render('messages/public.ejs', {
      currentUser: req.session.currentuser
    })
  } else {
    res.render(req.session.logged);
  }
})

// Get private messages
router.get('/:id', (req, res) => {
  if (req.session.currentuser._id == req.params.id) {
    res.render('messages/private.ejs', {
      currentUser: req.session.currentuser,
      requestedID: req.params.id
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
