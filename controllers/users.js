const express = require('express');
const router = express.Router();

// registration page
router.get('/new', function(req, res){
    res.render('users/new.ejs');
});

module.exports = router;
