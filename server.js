const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session') 
const requireLogin = require('./middleware/requireLogin')
const authController     = require('./controllers/authcontroller');
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
    collection: 'mySessions'
});

require('./db/db');

const HappyHoursController = require('./controllers/happyhours');
const ReviewsController = require('./controllers/reviewcontroller');
const UsersController = require('./controllers/users')


app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.static('css'));
app.use(session({ 
    saveUnitialized: true,
    secret: "whambam",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    store: store,
    resave: true,
}))

app.use((req, res, next)=> {
    res.locals.userId = req.session.userId;
    next();
});

store.on('connected', function() {
    store.client; // The underlying MongoClient object from the MongoDB driver
})
store.on('error', function(error) {
    assert.ifError(error);
    assert.ok(false);
});
  
app.use('/happyhours', HappyHoursController, express.static('public'));
app.use('/reviews', ReviewsController, express.static('public'));
app.use('/users', UsersController, express.static('public'));
app.use('/', express.static('public'));
app.use('/auth', authController);


//landing
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(3000);
