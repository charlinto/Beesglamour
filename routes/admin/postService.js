const express = require('express');
const router = express.Router();
const upload = require('../../config/multer');
const cloudinary = require('../../config/cloudinary');
// const Category = require('../../model/Category');
var Service = require('../../model/Service');
var Postservice = require('../../model/Postservice')
var User = require('../../model/User')

// const Post = require('../../model/Post');
const { ensureAuthenticated } = require('../../config/auth');
// const admincontroller = require('../../controllers/adminController')


// get-add-post
router.get('/add',(req,res) =>{
    Service.find()
    .then(service =>{
        if(service){
          
            res.render('admin/postservice/add-postservice', {layout: 'backendLayout', service})
        }
        else{
            req.flash('error_msg', 'Category Not Found!')
            res.redirect('/postservice/add')
        }
    })
    .catch(err =>{
        req.flash('error_msg', 'there was an error. Try again!')
        res.redirect('/postservice/add')

    })

})
// add-post
router.post('/add',ensureAuthenticated, (req,res) =>{
         const newPostservice = new Postservice({
                postserviceName: req.body.postservice_name,
                postserviceDesc: req.body.postservice_desc,
                
            })

            newPostservice.save()
            .then(postservice =>{
                req.flash('success_msg', postservice.postserviceName  +  ' was created successfully')
                res.redirect('/postservice/add')
            })

})
// all- Post
router.get('/all', (req,res) =>{
    Postservice.find().populate("postserviceService", "serviceName")
    .then(postserv =>{
        if(postserv){
            res.render('admin/postservice/all-postservice', {layout: 'backendLayout', postserv})
        }
    })
    .catch(err =>{
        req.flash('success_msg', 'there was an error. Try again!')

    })
})
// edit-post
router.get('/edit/:id', (req,res) =>{
    Postservice.findOne({_id: req.params.id}).populate("postserviceService", "serviceName")
    .then(postservice =>{
        if(postservice){
            Service.find()
            .then(service =>{
                res.render('admin/postservice/edit-postservice', {layout: 'backendLayout', postservice, service})

            })
        }
    })

    .catch(err =>{
        req.flash("error_msg", "There was an error")
    })
});
 

router.get('/update', (req, res) =>{
    res.render('admin/postservice/edit-postservice', {layout: 'backendLayout'})
});
// update- post
router.post('/update/:id', (req,res) =>{
    const {postservice_name, postservice_desc,} = req.body;
    let errors = [];
if(!postservice_name || !postservice_desc){
    errors.push({msg: "please fill in all the fields"})
}
if(errors.length > 0){
    res.render('admin/postservice/edit-postservice', {layout: 'backendLayout', errors})
}
    else{
        //checking if category exists
        const updatePost = {
            postserviceName: postservice_name,
            postserviceDesc: postservice_desc
        }

        Postservice.findOneAndUpdate({_id: req.params.id}, {$set: updatePost}, {new: true})
        .then(postservice =>{
            req.flash('success_msg', postservice.postserviceName + ' was successfully updated')
            res.redirect('/postservice/all')
        })
        .catch(err =>{
            req.flash('error_msg', "There was an error, Try Again")
        })
    }
})
// deletedPost
router.get('/delete/:id',(req,res) =>{
    Postservice.findOneAndDelete({_id: req.params.id})
    .then(postservice =>{
        req.flash('error_msg', postservice.postserviceName + ' was successfully deleted')
        res.redirect('/postservice/all')
    })
    .catch(err =>{
        req.flash('error_msg', "There was an error, Try Again")
    })
})


module.exports = router;