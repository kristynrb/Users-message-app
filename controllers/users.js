const express = require('express'),
      router = express.Router(),
      bcrypt = require('bcrypt'),
      User = require('../models/users.js');

// RENDER NEW USER PAGE
router.get('/new', (req, res) => {
    res.render('users/new.ejs');
});

// REGISTER A NEW USER
router.post('/', (req, res) => {
  // hash the password
  const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

  //The new user
  const newUser = {};
  newUser.username = req.body.username;
  newUser.password = hashedPassword;

  User.create(newUser, (err, createdUser) => {
        req.session.currentuser = createdUser;
        req.session.logged = true;
        res.redirect('/welcome');
    });
});

// USER'S PRIVATE MESSAGES
router.get('/:id', (req, res) => {
  if (req.session.currentuser._id == req.params.id) {
    Message.find({author_id: req.params.id, status: "private"}, (err, userPrivateMessages) => {
        res.render('messages/private.ejs', {
          messages: userPrivateMessages,
          currentUser: req.session.currentuser,
          requestedID: req.params.id
        });
    })
  } else {
      res.redirect('/');
  }
});

module.exports = router;
