const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      ejs = require('ejs'),
      session = require('express-session'),
      mongoose = require('mongoose'),
      PORT = process.env.PORT || 3000,
      MONGOURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/omni_lab_interview_app'


// routes
app.get('/', (req, res) => {
  res.send("home page");
});

// server
app.listen(3000, () => {
  console.log("Omni Labs interview app running on port 3000");
});
