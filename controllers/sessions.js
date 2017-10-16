const express = require('express'),
      router = express.Router(),
      bcrypt = require('bcrypt'),
      User = require('../models/users.js');

// RENDER NEW USER PAGE
router.get('/register', (req, res) => {
    res.render('users/new.ejs');
});

// REGISTER A NEW USER
router.post('/register', (req, res) => {
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
router.get('/new', (req, res) => {
    res.render('sessions/new.ejs');
});

//SIGN IN - CREATE A NEW SESSION
router.post('/', (req, res) => {
  console.log(req.body);
    User.findOne({ username: req.body.username }, (err, foundUser) => {
      console.log("foundUser:", foundUser);
      if(foundUser){
        if(bcrypt.compare(req.body.password, foundUser.password)){
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

//GET PASSWORD RESET PAGE
router.get('/password-reset', (req, res) => {
  console.log(req.session);
  console.log("..............", req.session.currentuser.username);
    res.render('users/reset.ejs', {
      currentUserName: req.session.currentuser.username
    });
});

// RESET PASSWORD
router.post ('/password-reset', function(req, res){

  let foundUser = User.findOne({username: req.body.username});
  const newPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    if(foundUser){
      User.updateOne(
        {username: req.body.username},
        {$set:
          {password : newPassword}
        },(err, updatedDoc) => {
        if (err) {
          console.log(err)
        } else {
          res.redirect('/welcome');
        }
      })
    } else {
      res.redirect('/');
    }
})

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
