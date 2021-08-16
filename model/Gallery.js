const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GallerySchema = new Schema({
    galleryName:{
        type: String,
        required: true
    },
    galleryDesc:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now()
    },

})
module.exports = mongoose.model('gallery', GallerySchema)