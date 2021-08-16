const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostGallerySchema = new Schema({
    postgalleryName:{
        type: String,
        required: true
    },
    postgalleryImage:{
        type: String,
        required: true
    },
    postgalleryCategory:{
        type: String,
        required: true
    },
   
    postgalleryAuthor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
  
    postgalleryDesc:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('postgallery', PostGallerySchema)