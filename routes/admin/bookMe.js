var express = require('express');
// const Category = require('../../model/Category');
const BookMe = require('../../model/BookMe');
// const Getintouch = require('../../model/Getintouch');
// const Email = require('../../model/EmailSubs');

var router = express.Router();



router.get('/bookMe',function(req,res,){
    BookMe.find()
    .then(bookMe => {
        res.render('admin/all-bookMes',{layout: 'backendLayout.hbs',title: 'All services',bookMe});
        // console.log(Category)
    })
    .catch (err =>{
        req.flash('error_msg',"There was an error. Try again");
    })

});



module.exports = router;