const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 
// import middleware
const flash = require('connect-flash');
const passport = require('../config/ppConfig');
const isLoggedIn = require('../middleware/isLoggedIn');
//const { default: ModelManager } = require('sequelize/types/lib/model-manager');

// GET route for viewing monster data via API
router.get('/', function(req, res) {
    let dndUrl = `https://www.dnd5eapi.co/api/monsters/${req.query.name}/`
    //console.log(dndUrl)
    axios.get(dndUrl)
    .then(apiResponse => {
        let monster = apiResponse.data;
        db.user.findByPk(req.user.id, {include: [db.encounter]})
        .then(function(user) {
            res.render('monster/view', {monster: monster, encounter: user.encounters})
        })
    }).catch(error => {
        console.log(error)
    })
});

//POST route to add monster's name to data base to be accessed by encounters list
router.post('/', function(req, res) {
    db.monster.create({
        name: req.body.name,
        health: req.body.health,
        initiative: 0,
    }).then(function(monster) {
       db.encounter.findByPk(req.body.encounterId).then(function(encounter) {
           monster.addEncounter(encounter).then(function(relationInfo) {
               //console.log(monster.name, " was added to ", encounter.title);
               res.redirect('profile')
           })
       })
    }).catch(error => {
        console.log(error)
    })
})






module.exports = router;