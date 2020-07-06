const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 
// import middleware
const flash = require('connect-flash');
const passport = require('../config/ppConfig');
const isLoggedIn = require('../middleware/isLoggedIn');

// GET our run route
router.get('/run', function(req, res) {
    res.render('encounter/run')
});

router.get('/create', function(req, res) {
    res.render('encounter/create')
});

// GET router to post encounter titles to monster view page
router.get('/', function(req, res) {
    db.encounter.findAll()
    .then(function(encounter) {
        res.render('monster/view', {encounter: encounter});
    }).catch(error => {
        console.log(error)
    })
})

router.get('/view', function(req, res) {
//     db.user.findByPk(req.user.id, {include: [db.encounter]})
//     .then(function(user) {
//         res.render('encounter/view', {monster: user.encounters.monsters, encounter: user.encounters})
//     }).catch(error => {
//     console.log(error)
//     })
// })
    // console.log(req.query.encounterId)
    db.encounter.findByPk(req.query.encounterId, {include: [db.monster, db.user]})
    .then(function(encounter) {
        console.log(encounter)
        res.render('encounter/view', {encounter: encounter, monsters: encounter.dataValues.monsters})
    }).catch(error => {
        console.log(error)
    })
})

// POST route to add title to encounter && add to specific logged in user
router.post('/', function(req, res) {
    db.encounter.findOrCreate({
        where: {title: req.body.title}
    }).then(function([encounter, created]){
        db.user.findOrCreate({
            where: {id: req.user.id}
        }).then(function([user, created]) {
            encounter.addUser(user).then(function(relationInfo) {
                console.log(user.id, " created ", encounter.title);
                res.redirect('profile')
            })
        })
    }).catch(error => {
        console.log(error)
    })
});




module.exports = router;