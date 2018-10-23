const express = require('express');
const router = express.Router();
const HappyHour = require('../models/hhmodel');
const Review = require('../models/reviewmodel');
const requireLogin = require('../middleware/requireLogin')


// index route
router.get('/',requireLogin, (req, res) =>{
    HappyHour.find({}, (err, foundHappys) => {
        res.render('happyhours/index.ejs', {
            happy: foundHappys
        })
    })
});

// new happy hour
router.get('/new',requireLogin, async (req, res) => {
    try{
       const allHappy = await HappyHour.find();
    res.render('happyhours/new.ejs', {
        happy: allHappy
    })  
    } catch(err){
        res.send(err)
    }
   
});

router.put('/',requireLogin, async (req, res) => {
    try{
        await HappyHour.create(req.body, () => {
            res.redirect('/happyhours')
        })

    }catch(err){
        res.send(err)
    }
    
});

// edit
router.get('/:id/edit',requireLogin, async (req, res) => {
    try {
        const foundHappy = await HappyHour.findById(req.params.id)
        res.render('happyhours/edit.ejs', {
            happy: foundHappy
        })

    } catch(err){
        res.send(err)
    }
});

router.put('/:id',requireLogin, async (req, res) => {
    try {
        await HappyHour.findByIdAndUpdate(req.params.id, req.body, () => {
            console.log(req.body, 'the req.body')
            res.redirect('/happyhours')
        });
    }catch(err){
        req.send(err)
    }
})

// show route
router.get('/:id',requireLogin, async (req, res) => {
    try{
        //const foundReviews = await Reveiw.find({});
        const findHappy = await HappyHour.findById(req.params.id)
        res.render('happyhours/show.ejs', {
            happy: findHappy,
            //.review: foundReviews
        })
    }catch(err){
        res.send(err)
    }

});


// delete
router.delete('/:id',requireLogin, async (req, res) => {
    try{
        HappyHour.findByIdAndDelete(req.params.id, req.body, () => {
            res.redirect('/happyhours')
        });
    }catch(err){
        res.send(err)
    }
});

module.exports = router;