const express = require('express');
const router  = express.Router();
const User    = require('../models/usermodel');
const bcrypt  = require('bcryptjs');
const requireLogin = require('../middleware/requireLogin')


//login
router.get('/login', (req, res) => {
  res.render('auth/auth.ejs', {
    message: req.session.message
  });
});
//register
router.post('/register', async (req, res) => {
    console.log(req.body)
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
  res.redirect('/auth/login');
});

//login
router.post('/login', async (req, res) => {
  try {
          const foundUser = await User.findOne({name: req.body.name});
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
