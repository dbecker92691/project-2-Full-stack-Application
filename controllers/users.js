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


// // LOGIN
// router.post('/', function (req, res) {
//     User.findOne({
//          where: {
//              email: req.body.email
//                 }
//     }).then(function (user) {
//         if (!user) {
//            res.redirect('/');
//         } else {
// bcrypt.compare(req.body.password, user.password, function (err, result) {
//        if (result == true) {
//            res.redirect('users/:id', {users: User.find({})});
//        } else {
//         res.send('Incorrect password');
//         res.redirect('/');
//        }
//      });
//     }
//  });
// });


// // show
// router.get('/:id', async(req, res) => {
//     try{
//         const findUser = await User.findById(req.params.id)
//         res.render('users/show.ejs', {
//             users: findUser
//         })
//     } catch(err) {
//         res.send(err)
//     }
// });


    

// router.get('/:id/edit', async(req, res) => {
//     try {
//         const editUser = await User.findById(req.params.id)
//         res.render('/users/edit.ejs', {
//             users: editUser
//         })
//     } catch(err) {
//         res.send(err)
//     }
// })

// router.get('/:id/edit', async(req, res) => {
//     try {
//         if(req.session.logged === true) {
//             const editUser = await User.findById(req.params.id, {
//                 name: req.body.name,
//                 password: req.body.password,
//                 email: req.body.email
//             },
//             res.render('/users/edit.ejs', {
//                 users: editUser
//             }))
//         } else {
//             req.session.message = "you have to be logged in to do that"
//             res.redirect('/users')
//         }
//     } catch(err) {
//         res.send(err)
//     }
// })

// router.get('/:id/edit', async(req, res) => {
//     try {
//         if(!req.session.loggedIn) {
//             req.session.message = "you need to be logged in to do that"
//             return res.redirect('/users')
//         } else {
//             const editUser = await User.findById(req.params.id, {
//                 name: req.body.name,
//                 password: req.body.password,
//                 email: req.body.email
//             })
//         }
//             res.render('users/edit.ejs', {
//                 users: editUser 
//         })
//     } catch(err) {
//         res.send(err)
//     }
// })





module.exports = router;