const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 
// import middleware
const flash = require('connect-flash');
const passport = require('../config/ppConfig');
//const { default: ModelManager } = require('sequelize/types/lib/model-manager');

// register GET route for viewing monster page
router.get('/', function(req, res) {
    res.render('monster/view');
});






module.exports = router;