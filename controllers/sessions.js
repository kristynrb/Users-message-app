const express = require('express'),
      router = express.Router(),
      bcrypt = require('bcrypt'),
      User = require('../models/users.js');

// RENDER NEW USER PAGE
router.get('/register', (req, res) => {
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

//LOGIN
router.get('/new', function(req, res){
    res.render('sessions/new.ejs');
});

//CREATE A NEW SESSION
router.post('/', function(req, res){
    User.findOne({ username: req.body.username }, (err, foundUser) => {
      if(foundUser){
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.currentuser = foundUser;
            req.session.logged = true;
            res.redirect('/welcome');
          } else {
            res.send('password is incorrect');
          }
        } else {
          res.send('username is incorrect');
        }
    });
});

// LOGOUT OF SESSION
router.get('/logout', function(req, res){

  req.session.destroy((err) => {
      if(err){
        console.log(err);
      } else {
        res.redirect('/');
      }
  });
});

module.exports = router;
