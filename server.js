const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

require('./db/db');

const HappyHoursController = require('./contollers/happyhours');
const ReviewsController = require('./contollers/reviewmodel');
const UsersController = require('./contollers/users')


app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/happyhours', HappyHoursController);
app.use('/reviews', ReviewsController);
app.use('/users', UsersController);

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(3000);