var express = require('express');
var router = express.Router();
const Post = require('../model/Post')
const Category = require('../model/Category')
const Comment = require('../model/Comment')



router.get('/:id', function(req, res, next) {
    // res.render('index', { title: "Kate's Blog"});
    Post.findById({_id: req.params.id}).populate("postCategory", "categoryName").populate("postComments").populate("postAuthor")
    .then(post =>{
      if(!post){
        console.log("oops!")
      }
      // let profileImage = req.user.profileImage
      res.render('single', {title: 'Blog', post, user: req.user})
      console.log(post)
    })
    .catch(err =>{
      console.log(err)
    })
  });
  
  router.post('/:id/comment', function(req, res, next) {

    const newComment = new Comment({
        commentName: req.body.comment_name,
        commentEmail: req.body.comment_email,
        commentWebsite: req.body.comment_website,
        commentContent: req.body.comment_content,
        
      })


      Comment.create(newComment, (error, comment) =>{
          if(error){
              console.log(error);
          }
          else{
              Post.findById({_id: req.params.id})
              
              .then(post =>{
                  post.postComments.push(comment);

                  post.save()
                  
                  .then(savedPost =>{
                    console.log(savedPost)
                      req.flash("success_msg", "Comment added successfully");
                      res.redirect(`/post/${post._id}/#comment_msg`)
                  })
              })
              .catch(err =>{
                console.log(err)
              })
          }
      })
    })


  module.exports = router;