const express = require('express');
const router = express.Router();
const Review = require('../models/reviewmodel');

// /reviews/	GET	index
router.get('/', async(req, res) => {
    try{
        const getReviews = await Review.find({});
        res.render('reviews/index.ejs', {
            reviews: Review
        });
    } catch(err) {
        res.send(err)
    }
});

// /reviews/new	GET	new
router.get('/new', async(req, res) => {
    try{
        res.render('reviews/new.ejs')
    } catch(err) {
        res.send(err)
    }
});

// /reviews	POST	create
router.post('/', async(req, res) => {
    try{
        const createReview = await Review.create(req.body);
        res.redirect('/reviews')
    } catch(err) {
        res.send(err)
    }
});

// /reviews/:id	GET	show
router.get('/:id', async(req, res) => {
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
router.get('/:id/edit', async(req, res) => {
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
router.put('/:id', async(req, res) => {
    try{
        const updateReviews = await Review.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/reviews')
    } catch(err) {
        res.send(err)
    }
});

// /reviews/:id	DELETE	destroy
router.delete('/:id', async(req, res) => {
    try{
        const deleteReview = await Review.findOneAndDelete(req.params.id);
        res.redirect('/reviews')
    } catch(err) {
        res.send(err)
    }
});

module.exports = router;