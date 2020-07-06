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

router.get('/view', function(req, res) {
    res.render('encounter/view')
})

// GET router to post encounter titles to monster view page
router.get('/', function(req, res) {
    db.encounter.findAll()
    .then(function(encounter) {
        res.render('monster/view', {encounter: encounter});
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