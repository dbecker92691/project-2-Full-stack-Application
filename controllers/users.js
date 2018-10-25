const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const requireLogin = require('../middleware/requireLogin')



// /users/	GET	index
router.get('/',requireLogin, async(req, res) => {
    try{
        const getUsers = await User.find({});
        console.log(req.session.userId)
        const currentUser = await User.findById(req.session.userId)
        res.render('users/index.ejs', {
            users: User,
            user: currentUser
        })
        
    } catch(err) {
        res.send(err)
    }
});

//edit
router.get('/edit',requireLogin, async (req, res) => {
    try{
        const currentUser = await User.findById(req.session.userId)
        res.render('users/edit.ejs',{
            user: currentUser
            })
        } catch(err){
            console.log(err)
            res.send(err)
        }
 });

// /users/new	GET	new
router.get('/new',requireLogin, async(req, res) => {
    try{
        // const newUser = await User.find({});
        res.render('users/new.ejs', {
            users: User
        })
    } catch(err) {
        res.send(err)
    }
});

// /users	POST	create
router.post('/new',requireLogin, async(req, res) => {
    try{
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        console.log(hashedPassword)
        const newUserObject = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
    } 
    const createUser = await User.create(newUserObject);
    res.redirect('/users')
        } catch(err) {
        res.send(err)
    };
});

// /users/:id	PATCH/PUT	update
router.put('/:id',requireLogin, async(req, res) => {
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/users')
    } catch(err) {
        res.send(err)
    }
});


//delete
router.delete('/:id',requireLogin, async(req, res) => {
    try{
        const deleteUser = await User.findOneAndDelete(req.params.id, req.body);
        res.redirect('/users')
    } catch(err) {
        res.send(err)
    }
});

module.exports = router;