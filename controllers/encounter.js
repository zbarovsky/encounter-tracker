const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 
// import middleware
const flash = require('connect-flash');
const passport = require('../config/ppConfig');
const isLoggedIn = require('../middleware/isLoggedIn');

// GET our home run route
router.get('/', function(req, res) {
    res.render('encounter/run')
});

router.get('/create', function(req, res) {
    res.render('encounter/create')
});

// POST route to add title to encounter
router.post('/', function(req, res) {
    db.encounter.findOrCreate({
        where: {title: req.body.title}
    }).then(function([createTitle,created]){
        console.log(createTitle)
        res.redirect('profile')
    }).catch(error => {
        console.log(error)
    })
});




module.exports = router;