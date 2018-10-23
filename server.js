const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session') 

require('./db/db');

const HappyHoursController = require('./controllers/happyhours');
const ReviewsController = require('./controllers/reviewcontroller');
const UsersController = require('./controllers/users')

app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.static('css'));
app.use(session({ 
    saveUnitialized: false,
    secret: "whambam"
}))

app.use('/happyhours', HappyHoursController, express.static('css'));
app.use('/reviews', ReviewsController, express.static('css'));
app.use('/users', UsersController, express.static('css'));
app.use('/', express.static('css'));
const requireLogin = (req, res, next) => {
    if(!req.session.user){
        res.redirect('/users/new.ejs')
    } else {
        next();
    }
};

app.get('/users', requireLogin, (req, res) => {
        res.render('index.ejs')
});

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(3000);
