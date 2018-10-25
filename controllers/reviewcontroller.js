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
        const review = await Review.find({});
        const happy = await Happy.find({});
        res.render('reviews/index.ejs', {
            happy: happy, 
            reviews: review
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
        const user = await User.findById(req.session.userId);
        res.render('reviews/new.ejs', {
            happy: happy,
            review: review,
            user: user
        })
    } catch(err) {
        res.send(err)
    }
});


router.post('/', async(req, res) => {
    try{
        if(!req.session.userId) {
            res.render('/user/new.ejs', {
                message: "you must be logged in to do that"
            })
        } else {
            const newReview = {
                happyHour: req.body.happyHour,
                body: req.body.body,
                user: req.session.userId
            
            }
        const foundHappy = await Happy.findById(req.body.happyHour);
        const foundUser = await User.findById(req.session.userId);
        const createdReview = await Review.create(newReview);
        foundHappy.reviews.push(createdReview._id);
        foundUser.reviews.push(createdReview._id);
        await foundHappy.save();
        await foundUser.save();
        res.redirect('/reviews')
        }   

    } catch(err) {
        console.log(err)
        res.send(err)
    }
});


// /reviews/:id	GET	show
router.get('/',requireLogin, async(req, res) => {
    try{
        const reviews = await Review.findById(review.body.id).populate('user').populate('happyHours');
        res.render('/reviews', {
            reviews: reviews
            
        })
        console.log(reveiw, 'here is our review')
    } catch(err) {
        res.send(err)
    }
});

// /reviews/:id/edit	GET	edit
// router.get('/:id/edit',requireLogin, async(req, res) => {
//     try{
//         const editReviews =  await Review.findById(req.params.id);
//         res.render('reviews/edit.ejs', {
//             users: editReviews
//         });
//     } catch(err) {
//         res.send(err)
//     }
// });

// // /reviews/:id	PATCH/PUT	update
// router.put('/:id',requireLogin, async(req, res) => {
//     try{
//         const updateReviews = await Review.findByIdAndUpdate(req.params.id, req.body);
//         res.redirect('/reviews')
//     } catch(err) {
//         res.send(err)
//     }
// });

// // /reviews/:id	DELETE	destroy
// router.delete('/:id',requireLogin, async(req, res) => {
//     try{
//         const deleteReview = await Review.findOneAndDelete(req.params.id);
//         res.redirect('/reviews')
//     } catch(err) {
//         res.send(err)
//     }
// });

module.exports = router;