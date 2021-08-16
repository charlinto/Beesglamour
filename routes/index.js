var express = require('express');
const Email = require('../model/EmailSubs');
var router = express.Router();
const Post = require('../model/Post');
const Category = require('../model/Category');
const User = require('../model/User');
const mongoose = require('mongoose');
const BookMes = require('../model/BookMe');
var Postservice = require('../model/Postservice');
var PostGallery = require('../model/PostGallery');
const {Getintouch} = require('../model/Getintouch');

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: "LINTO Blog"});

  Postservice.find()
  .then(postServ => {
    let activeClass = false;
    console.log(postServ)
    res.render('index', {user: req.user,postServ, activeClass});
  })
});

router.get('/about', function (req, res, next) {
  let activeClass = false;
  res.render('about.hbs',{
    user: req.user,
    activeClass
  })
});


router.get('/services', function (req, res, next) {
  Postservice.find()
  .then(postServ => {
    console.log(postServ)
    res.render('services.hbs', {postServ, title: 'Services',  user: req.user});
  })
});

router.get('/gallery', function (req, res, next) {
  PostGallery.find()
  .then(postphoto => {
    console.log(postphoto)
    res.render('gallery.hbs', {postphoto, title: 'gallery',  user: req.user});
  })
  // res.render('gallery.hbs',)
});

router.get('/blog', function (req, res, next) {
  Category.find()
    .then(category => {
      User.find()
        .then(users => {
          console.log(users)
          Post.find().populate("postCategory", "categoryName")

            .populate('postAuthor')
            .then(post => {
              if (!post) {
                console.log("opps")
              }
                res.render('blog.hbs',{
                  title: 'LINTO Blog',
                  post,
                  category,
                  users,
                  user: req.user
                });
              })
              .catch(err => {
                console.log(err)
              })
          })
      })
});


router.get('/contact', function (req, res, next) {
  res.render('contact.hbs',{
    user: req.user
  });
});

router.post('/bookMe',async(req,res) =>{
  // console.log("You hit me");
  const {fullname, email, service, date, message, phonenumber} = req.body;
  console.log("Hii!!!!!!!!", req.body);
  const newBookMe = new BookMes({
    fullname,
    email,
    service,
    date,
    phonenumber,
    message
  })
  await newBookMe.save()
  .then((bookme) => {
    console.log(newBookMe)
    req.flash('success_msg',bookme.userBookMe + "successfully BOOKED")
    res.redirect('/');
  })
  .catch(err =>{
    req.flash('error_msg', 'there was an error . try again');
  });


})



router.get('/bookMes',function(req,res, next){
  // console.log("You hit me here")
  BookMes.find()
    .then(book => {
        res.render('admin/all-bookMes',{layout: 'backendLayout.hbs',title: 'All category',book});
        // console.log(Category)
    })
    .catch (err =>{
         req.flash('error_msg',"There was an error. Try again");
     });
});

// delete bookme //
router.get('/bookMes/delete/:id', (req, res) =>{
  console.log(req.params.id)
  BookMes.findOneAndDelete({_id: req.params.id})
  .then(book =>{
      req.flash('error_msg', book.fullname + ' was successfully deleted')
      res.redirect('/bookMes')
  })
  .catch(err =>{
      req.flash('error_msg', "There was an error, Try Again")
  })
})



router.post('/getintouch',async(req,res) =>{
  console.log("You hit me");
  const {fullname,phonenumber,subject, message,} = req.body;
  // console.log("Hii!!!!!!!!", req.body);
  const newGetintouch = new Getintouch({
    fullname,
    subject,
    phonenumber,
    message
  })
  await newGetintouch.save()
  .then((getintouch) => {
    // console.log(newBookMe)
    req.flash('success_msg',getintouch.userGetintouch + "successfully")
    res.redirect('/contact');
  })
  .catch(err =>{
    req.flash('error_msg', 'there was an error . try again');
  });
})



router.get('/getintouchs',function(req,res, next){
  console.log("You hit me here")
  Getintouch.find()
    .then(touch => {
        res.render('admin/all-getintouchs',{layout: 'backendLayout.hbs',title: 'All category',touch});
        // console.log(Category)
    })
    .catch (err =>{
         req.flash('error_msg',"There was an error. Try again");
     });
});


// delete getintouch //
router.get('/getintouchs/delete/:id', (req, res) =>{
  Getintouch.findOneAndDelete({_id: req.params.id})
  .then(getintouchs =>{
      req.flash('error_msg', getintouchs.fullname + ' was successfully deleted')
      res.redirect('/getintouchs')
  })
  .catch(err =>{
      req.flash('error_msg', "There was an error, Try Again")
  })
})


router.post('/email',(req,res) =>{

  const newEmail = new Email({
    userEmail: req.body.email_sub

  }) 

  newEmail.save()
    .then(email =>{
    
      req.flash('success_msg',email.userEmail + "successfully subscribed")
      res.redirect('/#emails');
    })
    .catch(err =>{
      req.flash('error_msg', 'there was an error . try again');
    });

})


router.get('/emails',function(req,res, next){
  Email.find()
    .then(email => {
        res.render('admin/all-emails',{layout: 'backendLayout.hbs',title: 'All category',email});
        // console.log(Category)
    })
    .catch (err =>{
        req.flash('error_msg',"There was an error. Try again");
    });
});


router.get('/search', function(req, res, next) {
  queryy = req.query.q
  Category.find()
    .then(category => {
      Post.find({postName: { "$regex": queryy, "$options": "i" }})
      .populate('postCategory', 'categoryName')
      .then(posts => {
        res.render('search-results', {posts, category, title: `Search results for '${queryy}'`, user: req.user});
        }).catch(err => {
        req.flash("error_msg", "There was an Error. Try again");
      });
    })

});


module.exports = router;
