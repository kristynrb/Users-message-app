const express = require('express');
const app = express();

// routes
app.get('/', (req, res) => {
  res.send("home page");
});

// server
app.listen(3000, () => {
  console.log("Omni Labs interview app running on port 3000");
});
