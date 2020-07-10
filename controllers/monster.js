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
router.get('/', isLoggedIn, function(req, res) {
    function getUrl() {
        let dndUrl = `https://www.dnd5eapi.co/api/monsters/${req.query.name}/`
        let newUrl = dndUrl.replace(/\s/g, "-");
        return newUrl;
    }
    axios.get(getUrl())
    .then(apiResponse => {
        let monster = apiResponse.data;
        db.user.findByPk(req.user.id, {include: [db.encounter]})
        .then(function(user) {
            res.render('monster/view', {monster: monster, encounter: user.encounters})
        })
    }).catch(error => {
        console.log(error)
        req.flash('error', 'Sorry, this monster may not be in our database, please try searching again.')
        res.redirect('back')
    })
});

//GET route to create your own monster
router.get('/create', isLoggedIn, function(req, res) {
    db.user.findByPk(req.user.id, {include: [db.encounter]})
    .then(function(user) {
        res.render('monster/create', {encounter: user.encounters})
    })
})
    

//POST route to add monster's name, init, and health to data base to be accessed by encounters list
router.post('/', function(req, res) {
    db.monster.create({
        name: req.body.name,
        health: req.body.health,
        initiative: 0
    }).then(function(monster) {
       db.encounter.findByPk(req.body.encounterId).then(function(encounter) {
           monster.addEncounter(encounter).then(function(relationInfo) {
               //console.log('💩💩💩💩💩💩💩💩💩' + monster.name, " was added to ", encounter.title);
               req.flash('success', 'Successfully added, go ahead, search for another')
               res.redirect('back')
           })
       })
    }).catch(error => {
        console.log(error)
    })
})






module.exports = router;