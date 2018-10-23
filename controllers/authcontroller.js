const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');
const bcrypt = require('bcrypt');


router.post('/login', async(req, res) => {
    try {
        console.log(req.body);
        const foundUser = await User.findOne({username: req.body.username});
        if(!founduser) {
            throw new Error ("you're not real")
        }
        if(bcrypt.compareSync(req.body.password, foundUser.password) => {
            req.session.userId = foundUser._id;
            res.redirect('/')
        } else {
            throw new Error ("you're not real")
        })
    } catch(err) {
        req.session.message = err.message;
        res.redirect('/auth/login')
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = router;