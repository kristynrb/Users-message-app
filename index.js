const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      ejs = require('ejs'),
      session = require('express-session'),
      mongoose = require('mongoose'),
      PORT = process.env.PORT || 3000,
      MONGOURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/omni_lab_interview_app'

// VIEW ENGINE
app.set('views', './views');
app.set('view engine', 'ejs');

// ROUTES
app.get('/', (req, res) => {
  res.render("index.ejs");
});

//DATABASE & SERVER
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
