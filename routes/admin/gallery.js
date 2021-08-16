const express = require('express');
const router = express.Router();
const Gallery = require('../../model/Gallery')

router.get('/add', (req, res) =>{
    res.render('admin/gallery/add-gallery', {layout: 'backendLayout'})
});


router.post('/add', (req, res) =>{
    const {gallery_name, gallery_desc} = req.body;
        let errors = [];
    if(!gallery_name || !gallery_desc){
        errors.push({msg: "please fill in all the fields"})
    }
    if(errors.length > 0){
        res.render('admin/gallery/add-gallery', {layout: 'backendLayout', errors})
    }
    else{
        //checking if category exists
        Gallery.findOne({galleryName: gallery_name})
        .then(gallery =>{
            if(gallery){
                errors.push({msg: "gallery already exists"})
                return res.render('admin/gallery/add-gallery', {layout: 'backendLayout', errors})
            }
            const newGallery = new Gallery({
                galleryName: gallery_name,
                galleryDesc: gallery_desc
            })
            newGallery.save()
            .then(gallery =>{
                req.flash('success_msg', gallery.serviceName  +  ' was created successfully')
                res.redirect('/gallery/add')
            })
        })
    }
});



router.get('/all', (req, res) =>{
    Gallery.find()
    .then(gallery =>{
        if(gallery){
            res.render('admin/gallery/all-gallery', {layout: 'backendLayout', gallery})
        }
    })
    .catch(err =>{
        req.flash('success_msg', 'there was an error. Try again!')

    })

});


router.get('/edit/:id', (req, res) =>{

    Gallery.findOne({_id: req.params.id})
    .then(gallery =>{
        if(gallery){
            res.render('admin/gallery/edit-gallery', {layout: 'backendLayout', gallery})
        }
    })

    .catch(err =>{
        req.flash("error_msg", "There was an error")
    })

    
});


router.get('/update', (req, res) =>{
    res.render('admin/gallery/edit-gallery', {layout: 'backendLayout'})
});


router.post('/update/:id', (req, res) =>{
    const {gallery_name, gallery_desc} = req.body;
        let errors = [];
    if(!gallery_name || !gallery_desc){
        errors.push({msg: "please fill in all the fields"})
    }
    if(errors.length > 0){
        res.render('admin/gallery/edit-gallery', {layout: 'backendLayout', errors})
    }
    else{
        //checking if category exists
        const updateGallery= {
            galleryName: gallery_name,
            galleryDesc: gallery_desc
        }

        Gallery.findOneAndUpdate({_id: req.params.id}, {$set: updateGallery}, {new: true})
        .then(gallery =>{
            req.flash('success_msg', gallery.galleryName + ' was successfully updated')
            res.redirect('/gallery/all')
        })
        .catch(err =>{
            req.flash('error_msg', "There was an error, Try Again")
        })
         newCategory.save()
        .then(category =>{
             req.flash('success_msg', gallery.galleryName  +  'was created successfully')
            res.redirect('/gallery/add')
        })
    }
});

router.get('/delete/:id', (req, res) =>{
    Gallery.findOneAndDelete({_id: req.params.id})
    .then(gallery =>{
        req.flash('error_msg', gallery.galleryName + ' was successfully deleted')
        res.redirect('/gallery/all')
    })
    .catch(err =>{
        req.flash('error_msg', "There was an error, Try Again")
    })
})


module.exports = router;


// const express = require('express');
// const router = express.Router();
// const upload = require('../../config/multer');
// const cloudinary = require('../../config/cloudinary');
// // const Category = require('../../model/Category');
// const Gallery = require('../../model/Gallery');
// // const User = require('../../model/User')

// const { ensureAuthenticated } = require('../../config/auth');
// // const admincontroller = require('../../controllers/adminController')


// // get-add-post
// router.get('/add',(req,res) =>{
//     Gallery.find()
//     .then(gallery =>{
//         if(gallery){
          
//             res.render('admin/gallery/add-gallery', {layout: 'backendLayout', gallery})
//         }
//         else{
//             req.flash('error_msg', 'Category Not Found!')
//             res.redirect('/gallery/add')
//         }
//     })
//     .catch(err =>{
//         req.flash('error_msg', 'there was an error. Try again!')
//         res.redirect('/gallery/add')

//     })

// })
// // add-gallery
// router.post('/add',ensureAuthenticated, upload.single('gallery_image'),async(req,res) =>{
//     console.log(req.file)

//     try{
//         const result = await cloudinary.uploader.upload(req.file.path)
//         console.log(result)

        
      

//          const newGallery = new Gallery({
//                 galleryName: req.body.post_name,
//                 galleryDesc: req.body.post_desc,
//                 galleryImage: result.url,
//                 galleryCategory: req.body.post_category,
//                 galleryAuthor: req.user._id
                
//             })

//             newGallery.save()
//             .then(gallery =>{
//                 req.flash('success_msg', gallery.galleryName  +  ' was created successfully')
//                 res.redirect('/gallery/add')
//             })
        
//     }
//     catch(err){
//         console.log(err)
//     }

// })
// // all- Post
// router.get('/all', (req,res) =>{
//     Gallery.find().populate("galleryCategory", "galleryName")
//     .then(gallery =>{
//         console.log(gallery)
//         if(gallery){
//             res.render('admin/gallery/all-gallery', {layout: 'backendLayout', gallery})
//         }
//     })
//     .catch(err =>{
//         req.flash('success_msg', 'there was an error. Try again!')

//     })
// })
// // edit-post
// router.get('/edit/:id', (req,res) =>{
//     Gallery.findOne({_id: req.params.id}).populate("galleryCategory", "categoryName")
//     .then(gallery =>{
//         if(gallery){
//             Gallery.find()
//             .then(gallery =>{
//                 res.render('admin/gallery/edit-gallery', {layout: 'backendLayout', gallery, gallery})

//             })
//         }
//     })

//     .catch(err =>{
//         req.flash("error_msg", "There was an error")
//     })
// });
 

// router.get('/update', (req, res) =>{
//     res.render('admin/gallery/edit-gallery', {layout: 'backendLayout'})
// });
// // update- post
// router.post('/update/:id', (req,res) =>{
//     const {gallery_name, gallery_desc,} = req.body;
//     let errors = [];
// if(!gallery_name || !gallery_desc){
//     errors.push({msg: "please fill in all the fields"})
// }
// if(errors.length > 0){
//     res.render('admin/gallery/edit-gallery', {layout: 'backendLayout', errors})
// }
//     else{
//         //checking if category exists
//         const updatePost = {
//             galleryName: gallery_name,
//             galleryDesc: gallery_desc
//         }

//         Gallery.findOneAndUpdate({_id: req.params.id}, {$set: updateGallery}, {new: true})
//         .then(gallery =>{
//             req.flash('success_msg', gallery.galleryName + ' was successfully updated')
//             res.redirect('/gallery/all')
//         })
//         .catch(err =>{
//             req.flash('error_msg', "There was an error, Try Again")
//         })
//     }
// })
// // deletedPost
// router.get('/delete/:id',(req,res) =>{
//     Gallery.findOneAndDelete({_id: req.params.id})
//     .then(gallery =>{
//         req.flash('error_msg', gallery.galleryName + ' was successfully deleted')
//         res.redirect('/gallery/all')
//     })
//     .catch(err =>{
//         req.flash('error_msg', "There was an error, Try Again")
//     })
// })


// module.exports = router;
