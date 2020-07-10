// scrap function from encounter.js to run view encounters list

//     db.user.findByPk(req.user.id, {include: [db.encounter]})
//     .then(function(user) {
//         res.render('encounter/view', {monster: user.encounters.monsters, encounter: user.encounters})
//     }).catch(error => {
//     console.log(error)
//     })
// })

// DELETE encounter route -- still need to fix

/* <form class="form-group" method="POST" action="/profile/<%= encounter.id %>/?_method=DELETE">
    <label for="deleteEncounter"class="sr-only">Delete encounter</label>
    <input hidden type="text" name="encounterId" value="<%= encounter.id %>">
    <button class="btn btn-danger" type="submit" value="DELETE">Delete Encounter</button>
</form> */


// app.delete('/:id', function(req, res) {
//     console.log('🤬🤬🤬🤬🤬🤬🤬🤬🤬')
//     db.user.findByPk(req.user.id, {include: [db.encounter]})
//     .then(function(user) {
//         console.log(encounter + '💩💩💩💩💩💩💩💩💩💩💩')
//         db.encounter.destroy({
//             where: {id: req.body.encounterId}
//         }).then(function(encounter) {
//             res.redirect('back')
//         })
//     }).catch(error => {
//         console.log(error)
//     })
// })
// app.delete('/:id', function(req, res) {
//     db.encounter.destroy({
//         where: {id: req.body.encounterId}
//     }).then(function(encounter) {
//         res.redirect('back')
//     }).catch(error => {
//         console.log(error)
//     })
// })
