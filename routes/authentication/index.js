var express = require('express');
var router = express.Router();
const User = require('../../model/User')
var bcriptjs = require('bcrypt')
const saltRounds = 10;
var passport = require('passport')
const nodemailer = require('nodemailer');
const Getintouch = require('../../model/Getintouch');
const BookMe = require('../../model/BookMe');

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "16bc983c4b7eac",
      pass: "170304b62e4c22"
    }
  });




/* GET home page. */
router.get('/register', function(req, res) {
  res.render('authentication/register', { title: 'Blog | Sign Up' });
});


router.post('/register', function(req, res,){
const {first_name, last_name, email, password, confirm_password} = req.body;
let errors = [];

if(!first_name ||!last_name || !email || !password || !confirm_password){
    errors.push({msg: "please fill in all the fields"})
}

if(password.length < 8){
    errors.push({msg: "passwords must be at least 8 characters"})
}

if(password !== confirm_password){
    errors.push({msg: "passwords do not match"})
}

if(errors.length > 0){
    res.render('authentication/register', {errors})
}

else{
    User.findOne({email: req.body.email})
    .then(user =>{
        if(user){
            return res.send({msg: 'Email is already in use'})
        }

        const newUser = new User({

            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            role:'admin',
        })
    
        bcriptjs.genSalt(10, (err, salt) =>{
            bcriptjs.hash(newUser.password, salt, (err, hash) =>{
                newUser.password = hash
                newUser.save()
                .then(user =>{
                    req.flash('success_msg', 'Registration Successful');
                    res.redirect('/account/register')

                    return transport.sendMail({
                        to: email,
                        from:'info@myblog.com',
                        subject:"welcom to myblog",
                        html:"<p> welcom to my blog</p>"
                    })
    //console.log(user)
                    // return res.send(user);
                })
                .catch(err =>{
                    console.log(err);
                })
            })
                
            })
        })
    }
});


//login
router.get('/login', function (req, res, next) {
    res.render('authentication/login', { title: 'Blog||Sign In' });
  });
  
  router.post('/login', function (req, res, next) {
  
    const { email, password, } = req.body;
    let errors = [];
  
    if (!email || !password) {
      errors.push({ msg: "please fill in all the fields" })
    }
    if (errors.length > 0) {
      res.render('authentication/login', { errors })
    }
    else {
      passport.authenticate("local",{
          successRedirect: "/",
          failureRedirect: "/account/login",
          failureFlash: true,
        })
        (req, res, next);
    }
  
  });


    // console.log(req.body.first_name)



router.get('/users', (req, res) =>{

   // finding all users
    User.find()
    .then(users =>{
        res.render('admin/users', {layout: 'backendLayout', users})
    })
    .catch(err => console.log(err))
})

router.get('/users/delete/:id', (req, res) =>{
    User.findOneAndDelete({_id: req.params.id})
    .then(users =>{
        req.flash('error_msg', users.firstName + ' was successfully deleted')
        res.redirect('/account/users')
    })
    .catch(err =>{
        req.flash('error_msg', "There was an error, Try Again")
    })
})




module.exports = router;
