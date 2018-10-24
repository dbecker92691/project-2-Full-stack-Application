const express = require('express');
const router  = express.Router();
const User    = require('../models/usermodel');
const bcrypt  = require('bcryptjs');
const requireLogin = require('../middleware/requireLogin')
const validate = require('../middleware/validate')


//login
router.get('/login', (req, res) => {
  res.render('auth/login.ejs', {
    message: req.session.message
  });
});

//register
router.get('/register', (req, res)=>{
    res.render('auth/register.ejs', {
        message:req.session.message
    })
})

//register post
router.post('/register', async (req, res) => {
    try{
        const password = req.body.password;
        const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(2));
        console.log('password was hashed')

        const userEntry = {};
        userEntry.name = req.body.name
        userEntry.email = req.body.email;
        userEntry.password = passwordHash;

        const user = await User.create(userEntry);
        console.log(`the user that was created is ${user}`);
        req.session.logged   = true;
        req.session.message  = '';
        req.session.userId = user._id;
        res.redirect('/users');
    }catch(err){
        if(err.code == 11000){
            req.session.message = "Username taken";
            res.redirect('/auth/register');
        }else{
            console.log(err)
            res.send(err)
        }
        
    }
});

//login
router.post('/login', async (req, res) => {
  try {
          const foundUser = await User.findOne({email: req.body.email});
          console.log(`login: the user that was found is ${foundUser}`)
          if(foundUser){
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
                console.log(`succesful login in as ${foundUser}`)
                req.session.logged = true;
                req.session.userId = foundUser._id
                res.redirect('/users')
            } else {
              req.session.message = 'Username or Password is Wrong';
              res.redirect('/auth/login')
            }
        } else {
              req.session.message = 'Username or Password is Wrong';
              res.redirect('/auth/login')
            } 
    } catch(err) {
    res.send('error')
  }
}); 
//logout

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.send(err);
    } else {
      console.log('logout succesful')
      res.redirect('/')
    }
  });
});

module.exports = router;