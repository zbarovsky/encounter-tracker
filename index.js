// Required NPM library
require('dotenv').config();
const Express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const helmet = require('helmet');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const db = require('./models');
const isLoggedIn = require('./middleware/isLoggedIn');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const methodOverride = require('method-override');

// App setup
const app = Express();
app.use(Express.urlencoded({ extended: false}));
app.use(Express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));
app.use(helmet());
app.use(methodOverride('_method'));

// create new instance of class SequelizeStore
const sessionStore = new SequelizeStore({
    db: db.sequelize,
    expiration: 1000 * 60 * 120
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}))

sessionStore.sync();

// initialize and link flash messages and passport and session
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;

    next();
})

// ROUTES
app.get('/', function(req, res) {
    //check to see if user logged in
    res.render('index');
})

// GET route to show encounter titles on profile page
app.get('/profile', isLoggedIn, function(req, res){
    db.user.findByPk(req.user.id, {include: [db.encounter]})
    .then(function(user) {
        res.render('profile', {encounter: user.encounters})
    }).catch(error => {
    console.log(error)
    })
})

// TODO: delete route to remove enounter from profile page -- see testDb.js

// include controllers
app.use('/auth', require('./controllers/auth'));
app.use ('/encounter', require('./controllers/encounter'));
app.use('/monster', require('./controllers/monster'));

// initialize app on port 
app.listen(process.env.PORT || 3000, function() {
    console.log(`Lets get ready to roll init on port ${process.env.PORT}`)
})