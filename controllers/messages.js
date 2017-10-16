const express = require('express'),
      router = express.Router(),
      User = require('../models/users.js'),
      Message = require('../models/messages.js');

// GET PUBLIC MESSAGES
router.get('/', (req, res) => {
  console.log("req.session.logged: ", req.session.logged);
  console.log("req.session: ", req.session)
  if (req.session.logged){
    Message.find({status: "public"}, (err, allPublicMessages) => {
      // res.send(allMessages);
      res.render('messages/public.ejs', {
        messages: allPublicMessages,
        currentUser: req.session.currentuser,
        requestedID: req.params.id
      });
    })
  } else {
    res.redirect('/');
  }
});

// MAKE A MESSAGE
router.post('/', (req, res) => {
  console.log(req.body);
  User.findById(req.body.author_id, (err, foundUser) => {
    console.log("req.body.author_id: ", req.body.author_id);
    console.log("founduser: ", foundUser);
    Message.create(req.body, (err, createdMessage) => {
      foundUser.messages.push(createdMessage);
      foundUser.save((err, data) => {
        console.log(err)
        res.redirect('/welcome')
      });
    });
  })
});

module.exports = router;
