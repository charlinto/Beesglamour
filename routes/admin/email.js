var express = require('express');
const Category = require('../../model/Category');
const Email = require('../../model/EmailSubs');

var router = express.Router();



router.get('/email',function(req,res,){
    Email.find()
    .then(email => {
        res.render('admin/all-emails',{layout: 'backendLayout.hbs',title: 'All category',email});
        // console.log(Category)
    })
    .catch (err =>{
        req.flash('error_msg',"There was an error. Try again");
    })

});