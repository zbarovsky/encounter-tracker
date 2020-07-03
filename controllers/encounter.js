const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 
// import middleware
const flash = require('connect-flash');
const passport = require('../config/ppConfig');

// GET our home route
router.get('/', function(req, res) {
    res.render('encounter/run')
});





module.exports = router;