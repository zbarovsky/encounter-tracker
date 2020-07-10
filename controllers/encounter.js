const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 
// import middleware
const flash = require('connect-flash');
const passport = require('../config/ppConfig');
const isLoggedIn = require('../middleware/isLoggedIn');

// GET our run route
router.get('/run', isLoggedIn, function(req, res) {
      db.encounter.findByPk(req.query.encounterId, 
        {
            include: [db.monster, db.user],
            order: [
                [db.monster, 'initiative', 'DESC']
            ]
        })
       .then(function(encounter) {
            //console.log('🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬')
            //console.log(encounter)
            res.render('encounter/run', {encounter: encounter, monsters: encounter.dataValues.monsters})
        }).catch(error => {
          console.log(error)
    })
})

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

router.get('/view', isLoggedIn, function(req, res) {
    db.encounter.findByPk(req.query.encounterId, {include: [db.monster, db.user]})
    .then(function(encounter) {
        //console.log(encounter)
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

// PUT route to update init and health
router.put('/:id', function(req, res) {
    let rollResult = Math.floor((Math.random() * 20) +1)
    db.encounter.findByPk(req.query.encounterId, {include: [db.monster, db.user]})
    .then (function(encounter) {
        if(req.body.roll) {
            db.monster.update({
                health: req.body.health,
                initiative: rollResult
            }, {
                where: {
                    id: req.body.monsterId
                }
            })
        } else {
            db.monster.update({
                health: req.body.health,
                initiative: req.body.initiative
            }, {
                where: {
                    id: req.body.monsterId
                }
            })
        }  
    }).then(function(updated) {
        //console.log(updated)
        //console.log(rollResult)
        res.redirect('back')
    }).catch(function(error) {
        console.log(error)
    })
})

// DELETE route for removing monsters from encounters
router.delete('/:id', function(req, res) {
    console.log("💩")
    db.encounter.findByPk(req.body.encounterId, {include: [db.monster, db.user]})
    .then(function(encounter) {
        db.monster.destroy({
            where: {id: req.body.monsterId}
        }).then(function(monster) {
            res.redirect('back')
        })
    }).catch(error => {
        console.log(error)
    })
})


module.exports = router;