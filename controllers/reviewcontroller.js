const express = require('express');
const router = express.Router();
const Review = require('../models/reviewmodel');
const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const requireLogin = require('../middleware/requireLogin')
const Happy = require('../models/hhmodel')


// /reviews/	GET	index
router.get('/',requireLogin, async(req, res) => {
    try{
        const happy = await Happy.find({});
        // reviews is the data Review is the model
        // don't send the model send data
        res.render('reviews/index.ejs', {
            happy: happy 
        });
    } catch(err) {
        res.send(err)
    }
});

// /reviews/new	GET	new
router.get('/new',requireLogin, async(req, res) => {
    try{
        const happy = await Happy.find({});
        const review = await Review.find({});
        res.render('reviews/new.ejs', {
            happy: happy,
            review: review
        })
    } catch(err) {
        res.send(err)
    }
});


// /reviews	POST	create
router.post('/', async (req, res) => {
    try{
        console.log(req.body, "this is my wrek dat body")
        await Review.create(req.body);
        res.redirect('/reviews')

    }catch(err){
        res.send(err)
    }
    
});

// router.post('/', async(req, res) => {
//     try{
//         if(!req.session.userId) {
//             res.render('/user/new.ejs', {
//                 message: "you must be logged in to do that"
//             })
//         } else {
//             const newReview = {
//                 title: req.body.title,
//                 body: req.body,
//                 reviewer: req.session.userId
//             }
//         }
//     } catch(err) {
//         res.send(err)
//     }
// });

// const createReview = await Review.create(req.body);
// res.redirect('/reviews')


// /reviews/:id	GET	show
router.get('/:id',requireLogin, async(req, res) => {
    try{
        const findReviews = await Review.findById(req.params.id)
        res.render('reviews/show.ejs', {
            users: findReviews
        })
    } catch(err) {
        res.send(err)
    }
});

// /reviews/:id/edit	GET	edit
router.get('/:id/edit',requireLogin, async(req, res) => {
    try{
        const editReviews =  await Review.findById(req.params.id);
        res.render('reviews/edit.ejs', {
            users: editReviews
        });
    } catch(err) {
        res.send(err)
    }
});

// /reviews/:id	PATCH/PUT	update
router.put('/:id',requireLogin, async(req, res) => {
    try{
        const updateReviews = await Review.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/reviews')
    } catch(err) {
        res.send(err)
    }
});

// /reviews/:id	DELETE	destroy
router.delete('/:id',requireLogin, async(req, res) => {
    try{
        const deleteReview = await Review.findOneAndDelete(req.params.id);
        res.redirect('/reviews')
    } catch(err) {
        res.send(err)
    }
});

module.exports = router;