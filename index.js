// MIDDLEWARE
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      ejs = require('ejs'),
      session = require('express-session'),
      mongoose = require('mongoose'),

// SET SESSION MIDDLEWARE
app.use(session({
  secret: "OmniLabInterviewSecret",
  resave: false,
  saveUninitialized: false
}))

// VIEW ENGINE
app.set('views', './views');
app.set('view engine', 'ejs');

// CONTROLLERS
usersController = require('./controllers/users.js');
app.use('/users', usersController);

// ROUTES
// landing page for app
app.get('/', (req, res) => {
  res.render("index.ejs");
});

// welcome page - for those logged in
app.get('/welcome', (req, res) => {
  if (req.session.logged) {
    res.render('welcome.ejs');
  } else {
    res.redirect('/sessions/login')
  }
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
