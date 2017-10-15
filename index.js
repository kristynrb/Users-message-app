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

// ROUTES
// landing page for app
app.get('/', (req, res) => {
  res.render('index.ejs');
});

// ------------ for testing only - START--------------------
app.get('/show', (req, res) => {
  res.render('show.ejs')
});

app.get('/private-messages', (req, res) => {
  res.render('messages/private.ejs')
});

app.get('/public-messages', (req, res) => {
  res.render('messages/public.ejs')
});

// ------------ for testing only - END --------------------

// welcome page - for those logged in
app.get('/welcome', (req, res) => {
  if (req.session.logged) {
    res.render('welcome.ejs');
  } else {
    res.redirect('/sessions/login')
  }
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

db.once('openURI', () => {
  console.log("Database up and running");
});

app.listen(PORT, () => {
  console.log("Omni Labs interview app running on port", PORT);
});
