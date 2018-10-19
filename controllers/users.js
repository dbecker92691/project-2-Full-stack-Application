const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');

// /users/	GET	index
router.get('/', async(req, res) => {
    try{
        const getUsers = await User.find({});
        res.render('users/index.ejs', {
            users: User
        })
        
    } catch(err) {
        res.send(err)
    }
});

// /users/new	GET	new
router.get('/new', async(req, res) => {
    try{
        res.render('users/new.ejs')
    } catch(err) {
        res.send(err)
    }
});

// /users	POST	create
router.post('/', async(req, res) => {
    try{
        const createUser = await User.create(req.body);
        res.redirect('/users')
    } catch(err) {
        res.send(err)
    }
});

// /users/:id	GET	show
router.get('/:id', async(req, res) => {
    try{
        const findUser = await User.findById(req.params.id)
        res.render('users/show.ejs', {
            users: findUser
        })
    } catch(err) {
        res.send(err)
    }
});

// /users/:id/edit	GET	edit
router.get('/:id/edit', async(req, res) => {
    try{
        const editUser =  await User.findOne(req.params.id);
        res.render('users/edit.ejs', {
            users: editUser
        });
    } catch(err) {
        res.send(err)
    }
});

// /users/:id	PATCH/PUT	update
router.put('/:id', async(req, res) => {
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/users')
    } catch(err) {
        res.send(err)
    }
});

// /users/:id	DELETE	destroy
router.delete('/:id', async(req, res) => {
    try{
        const deleteUser = await User.findOneAndDelete(req.params.id);
        res.redirect('/users')
    } catch(err) {
        res.send(err)
    }
});

module.exports = router;
