const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session') 
const requireLogin = require('./middleware/requireLogin')


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
app.use((req, res, next)=> {
    res.locals.user = req.session.user;
    next();
  });

app.use('/happyhours', HappyHoursController, express.static('public'));
app.use('/reviews', ReviewsController, express.static('public'));
app.use('/users', UsersController, express.static('public'));
app.use('/', express.static('public'));

app.get('/users', requireLogin, (req, res) => {
        res.render('index.ejs')
});

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(3000);
