// MIDDLEWARE
const express = require('express');
      app = express(),
      bodyParser = require('body-parser'),
      ejs = require('ejs'),
      session = require('express-session'),
      mongoose = require('mongoose')

// SET MIDDLEWARE
app.use(session({
  secret: "OmniLabInterviewSecret",
  resave: false,
  saveUninitialized: false,
}));

app.use(bodyParser.urlencoded({
  extended:false,
}));

// VIEW ENGINE
app.set('views', './views');
app.set('view engine', 'ejs');

// CONTROLLERS
const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

const messageController = require('./controllers/messages.js');
app.use('/messages', messageController);

// ROUTES
// landing page for app
app.get('/', (req, res) => {
  res.render('index.ejs');
});

// landing once logged in
app.get('/show', (req, res) => {
  if (req.session.logged) {
    res.render('show.ejs', {
      currentUser: req.session.currentuser
    })
  } else {
    res.redirect('/');
  }
});

// private messages
app.get('/private-messages', (req, res) => {
  if (req.session.logged) {
    res.render('messages/private.ejs', {
      currentUser: req.session.currentuser
    })
  } else {
    res.redirect('/');
  }
});

// public messages
app.get('/public-messages', (req, res) => {
  if (req.session.logged) {
    res.render('messages/public.ejs', {
      currentUser: req.session.currentuser
    })
  }
});

// welcome page - for those logged in
app.get('/welcome', (req, res) => {
  if (req.session.logged) {
    res.render('show.ejs', {
      currentUser: req.session.currentuser
    });
  } else {
    res.redirect('/')
  };
});

//DATABASE & SERVER
const PORT = process.env.PORT || 3000,
      MONGOURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/omni_lab_interview_app';

const db = mongoose.connect(MONGOURI, {
  useMongoClient: true,
});

db.on('error', () => {
  console.log("Database error: check that your mongod instance is running");
});

mongoose.connection.once('open', () => {
  console.log("Database up and running");
});

app.listen(PORT, () => {
  console.log("Omni Labs interview app running on port", PORT);
});
