const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 
// import middleware
const flash = require('connect-flash');
const passport = require('../config/ppConfig');
//const { default: ModelManager } = require('sequelize/types/lib/model-manager');

// GET route for viewing monster data via API
router.get('/', function(req, res) {
    let dndUrl = `https://www.dnd5eapi.co/api/monsters/${req.query.name}/`
    //console.log(dndUrl)
    axios.get(dndUrl)
    .then(apiResponse => {
        let monster = apiResponse.data;
        //console.log(monster);
        res.render('monster/view', {monster: monster})
    }).catch(error => {
        console.log(error)
    })
});




module.exports = router;