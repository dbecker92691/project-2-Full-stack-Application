const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

require('./db/db');

const HappyHoursController = require('./controllers/happyhours');
const ReviewsController = require('./controllers/reviewcontroller');
const UsersController = require('./controllers/users')


app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use('/happyhours', HappyHoursController);
app.use('/reviews', ReviewsController);
app.use('/users', UsersController);

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(3000);
