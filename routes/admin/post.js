const express = require('express');
const router = express.Router();
const upload = require('../../config/multer');
const cloudinary = require('../../config/cloudinary');
const Category = require('../../model/Category');
const Post = require('../../model/Post');
const User = require('../../model/User')

const { ensureAuthenticated } = require('../../config/auth');
// const admincontroller = require('../../controllers/adminController')


// get-add-post
router.get('/add',(req,res) =>{
    Category.find()
    .then(categories =>{
        if(categories){
          
            res.render('admin/post/add-post', {layout: 'backendLayout', categories})
        }
        else{
            req.flash('error_msg', 'Category Not Found!')
            res.redirect('/post/add')
        }
    })
    .catch(err =>{
        req.flash('error_msg', 'there was an error. Try again!')
        res.redirect('/post/add')

    })

})
// add-post
router.post('/add',ensureAuthenticated, upload.single('post_image'),async(req,res) =>{
    console.log(req.file)

    try{
        const result = await cloudinary.uploader.upload(req.file.path)
        console.log(result)

        
      

         const newPost = new Post({
                postName: req.body.post_name,
                postDesc: req.body.post_desc,
                postImage: result.url,
                postCategory: req.body.post_category,
                postAuthor: req.user._id
                
            })

            newPost.save()
            .then(post =>{
                req.flash('success_msg', post.postName  +  ' was created successfully')
                res.redirect('/post/add')
            })
        
    }
    catch(err){
        console.log(err)
    }

})
// all- Post
router.get('/all', (req,res) =>{
    Post.find().populate("postCategory", "categoryName")
    .then(post =>{
        console.log(post)
        if(post){
            res.render('admin/post/all-post', {layout: 'backendLayout', post})
        }
    })
    .catch(err =>{
        req.flash('success_msg', 'there was an error. Try again!')

    })
})
// edit-post
router.get('/edit/:id', (req,res) =>{
    Post.findOne({_id: req.params.id}).populate("postCategory", "categoryName")
    .then(post =>{
        if(post){
            Category.find()
            .then(categories =>{
                res.render('admin/post/edit-post', {layout: 'backendLayout', post, categories})

            })
        }
    })

    .catch(err =>{
        req.flash("error_msg", "There was an error")
    })
});
 

router.get('/update', (req, res) =>{
    res.render('admin/post/edit-post', {layout: 'backendLayout'})
});
// update- post
router.post('/update/:id', (req,res) =>{
    const {post_name, post_desc,} = req.body;
    let errors = [];
if(!post_name || !post_desc){
    errors.push({msg: "please fill in all the fields"})
}
if(errors.length > 0){
    res.render('admin/post/edit-post', {layout: 'backendLayout', errors})
}
    else{
        //checking if category exists
        const updatePost = {
            postName: post_name,
            postDesc: post_desc
        }

        Post.findOneAndUpdate({_id: req.params.id}, {$set: updatePost}, {new: true})
        .then(post =>{
            req.flash('success_msg', post.postName + ' was successfully updated')
            res.redirect('/post/all')
        })
        .catch(err =>{
            req.flash('error_msg', "There was an error, Try Again")
        })
    }
})
// deletedPost
router.get('/delete/:id',(req,res) =>{
    Post.findOneAndDelete({_id: req.params.id})
    .then(post =>{
        req.flash('error_msg', post.postName + ' was successfully deleted')
        res.redirect('/post/all')
    })
    .catch(err =>{
        req.flash('error_msg', "There was an error, Try Again")
    })
})


module.exports = router;