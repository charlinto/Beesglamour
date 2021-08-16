const express = require('express');
const router = express.Router();
const Comment = require('../../model/Comment')
const Post = require('../../model/Post');
// const admincontroller = require('../../controllers/adminController')




router.get('/all',(req,res) =>{
    Comment.find()
    // .populate("commentPost", "postName")
    .then(comments =>{
        res.render('admin/comment/all-comments', {layout: 'backendLayout', title: 'All comments', comments});
        console.log(comments)

    })
    .catch(err =>{
        req.flash('error_msg', 'there was an error. Try again!')

    })

});

router.get('/delete/:id', (req,res) =>{
    Comment.findOneAndDelete({_id: req.params.id})
    .then(comment =>{
        req.flash('error_msg',  ' comment was successfully deleted')
        res.redirect('/post/all')
    })
    .catch(err =>{
        req.flash('error_msg', "There was an error, Try Again")
    })

})























module.exports = router;
