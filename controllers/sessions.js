const express = require('express'),
      router = express.Router(),
      bcrypt = require('bcrypt'),
      User = require('../models/users.js');

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
    // req.session.logged = false;
    // res.redirect('/');
});

module.exports = router;
