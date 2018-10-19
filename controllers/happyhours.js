const express = require('express');
const router = express.Router();

const HappyHour = require('../models/hhmodel');


// index route
router.get('/', (req, res) =>{
    HappyHour.find({}, (err, foundHappys) => {
        res.render('happyhours/index.ejs', {
            happy: foundHappys
        })
    })
});

// new happy hour
router.get('/new', async (req, res) => {
    try{
       const allHappy = await HappyHour.find();
    res.render('happyhours/new.ejs', {
        happy: allHappy
    })  
    } catch(err){
        res.send(err)
    }
   
});

router.put('/', async (req, res) => {
    try{
        await HappyHour.create(req.body, () => {
            res.redirect('/happyhours')
        })

    }catch(err){
        res.send(err)
    }
    
});

// edit

router.get('/:id/edit', async (req, res) => {
    try {
        const foundHappy = await HappyHour.findById(req.params.id)
        res.render('happyhours/edit.ejs', {
            happy: foundHappy
            
        })

    } catch(err){
        res.send(err)
    }
});

router.put('/:id', async (req, res) => {
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
router.get('/:id', async (req, res) => {
    try{
        const findHappy = await HappyHour.findById(req.params.id)
        res.render('happyhours/show.ejs', {
            happy: findHappy
        })
    }catch(err){
        res.send(err)
    }

});


// delete

router.delete('/:id', async (req, res) => {
    try{
        HappyHour.findByIdAndDelete(req.params.id, req.body, () => {
            res.redirect('/happyhours')
        });
    }catch(err){
        res.send(err)
    }

});











module.exports = router;