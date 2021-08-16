const express = require('express');
const router = express.Router();
const upload = require('../../config/multer');
const cloudinary = require('../../config/cloudinary');
// const Category = require('../../model/Category');
const Gallery = require('../../model/Gallery');
const PostGallery = require('../../model/PostGallery');
// const User = require('../../model/User')

const { ensureAuthenticated } = require('../../config/auth');
// const admincontroller = require('../../controllers/adminController')


// get-add-post
router.get('/add',(req,res) =>{
    Gallery.find()
    .then(gallery =>{
        if(gallery){
          
            res.render('admin/postgallery/add-postgallery', {layout: 'backendLayout', gallery})
        }
        else{
            req.flash('error_msg', 'Category Not Found!')
            res.redirect('/postgallery/add')
        }
    })
    .catch(err =>{
        req.flash('error_msg', 'there was an error. Try again!')
        res.redirect('/postgallery/add')

    })

})
// add-gallery
router.post('/add',ensureAuthenticated, upload.single('postgallery_image'),async(req,res) =>{
    console.log(req.file)

    try{
        const result = await cloudinary.uploader.upload(req.file.path)
        console.log(result)

        
      

         const newPostGallery = new PostGallery({
            postgalleryName: req.body.postgallery_name,
            postgalleryDesc: req.body.postgallery_desc,
            postgalleryImage: result.url,
            postgalleryCategory: req.body.postgallery_category,
            postgalleryAuthor: req.user._id
                
            })

            newPostGallery.save()
            .then(postgallery =>{
                req.flash('success_msg', postgallery.postgalleryName  +  ' was created successfully')
                res.redirect('/postgallery/add')
            })
        
    }
    catch(err){
        console.log(err)
    }

})
// all- Post
router.get('/all', (req,res) =>{
    PostGallery.find().populate("postgalleryCategory", "postgalleryName")
    .then(postphoto =>{
        // console.log(postgallery)
        if(postphoto){
            res.render('admin/postgallery/all-postgallery', {layout: 'backendLayout', postphoto})
        }
    })
    .catch(err =>{
        req.flash('success_msg', 'there was an error. Try again!')

    })
})
// edit-post
router.get('/edit/:id', (req,res) =>{
    PostGallery.findOne({_id: req.params.id}).populate("galleryCategory", "categoryName")
    .then(postgallery =>{
        if(postgallery){
            Gallery.find()
            .then(gallery =>{
                res.render('admin/postgallery/edit-postgallery', {layout: 'backendLayout', postgallery, gallery})

            })
        }
    })

    .catch(err =>{
        req.flash("error_msg", "There was an error")
    })
});
 

router.get('/update', (req, res) =>{
    res.render('admin/postgallery/edit-postgallery', {layout: 'backendLayout'})
});
// update- post
router.post('/update/:id', (req,res) =>{
    const {postgallery_name, postgallery_desc,} = req.body;
    let errors = [];
if(!postgallery_name || !postgallery_desc){
    errors.push({msg: "please fill in all the fields"})
}
if(errors.length > 0){
    res.render('admin/postgallery/edit-postgallery', {layout: 'backendLayout', errors})
}
    else{
        //checking if category exists
        const updatePost = {
            postgalleryName: postgallery_name,
            postgalleryDesc: postgallery_desc
        }

        PostGallery.findOneAndUpdate({_id: req.params.id}, {$set: updatePost}, {new: true})
        .then(postgallery =>{
            req.flash('success_msg', postgallery.postgalleryName + ' was successfully updated')
            res.redirect('/postgallery/all')
        })
        .catch(err =>{
            req.flash('error_msg', "There was an error, Try Again")
        })
    }
})
// deletedPost
router.get('/delete/:id',(req,res) =>{
    PostGallery.findOneAndDelete({_id: req.params.id})
    .then(postgallery =>{
        req.flash('error_msg', postgallery.postgalleryName + ' was successfully deleted')
        res.redirect('/postgallery/all')
    })
    .catch(err =>{
        req.flash('error_msg', "There was an error, Try Again")
    })
})


module.exports = router;

