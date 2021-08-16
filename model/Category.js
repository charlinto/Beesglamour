const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    categoryName:{
        type: String,
        required: true
    },
    categoryDesc:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now()
    },

})
module.exports = mongoose.model('categories', CategorySchema)