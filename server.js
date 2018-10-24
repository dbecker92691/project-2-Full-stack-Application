const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session') 
const requireLogin = require('./middleware/requireLogin')
const authController     = require('./controllers/authcontroller');
var cookieParser = require('cookie-parser')





require('./db/db');

const HappyHoursController = require('./controllers/happyhours');
const ReviewsController = require('./controllers/reviewcontroller');
const UsersController = require('./controllers/users')


app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(cookieParser())
app.use(express.static('css'));
app.use(session({ 
    saveUnitialized: false,
    secret: "whambam"
}))
app.use((req, res, next)=> {
    res.locals.userId = req.session.userId;
    next();
});
  

app.use('/happyhours', HappyHoursController, express.static('css'));
app.use('/reviews', ReviewsController, express.static('css'));
app.use('/users', UsersController, express.static('css'));
app.use('/', express.static('css'));
app.use('/auth', authController);


//landing
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(3000);
