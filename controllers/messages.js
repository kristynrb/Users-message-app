const express = require('express'),
      router = express.Router(),
      User = require('../models/users.js'),
      Message = require('../models/messages.js');

      // Get public messages
      router.get('/', (req, res) => {
        if (req.session.logged){
          Messages.find({status: "public"}, (err, allMessages) => {
            res.render('messages/public.ejs', {
              messages: allMessages,
              currentUser: req.session.currentuser
            })
          })
        } else {
          res.send(req.session.logged);
        }
      })

router.post('/', (req, res) => {
  Message.create(req.body, (err, createdMessage) => {
    // res.send("you created a private message")
    res.redirect('/users/"<%= currentUser._id %>');
  });
});

module.exports = router;
