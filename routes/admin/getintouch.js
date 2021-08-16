var express = require('express');
const Getintouch = require('../../model/Getintouch');
var router = express.Router();


router.get('/getintouch',function(req,res,){
    Getintouch.find()
    .then(getintouch => {
        res.render('admin/all-getintouchs',{layout: 'backendLayout.hbs',title: 'All services',getintouch});
        // console.log(Category)
    })
    .catch (err =>{
        req.flash('error_msg',"There was an error. Try again");
    })

});


module.exports = router;