const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    postCategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true
    },
    postName:{
        type: String,
        required: true
    },
    postImage:{
        type: String,
        required: true
    },
    postAuthor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    postDesc:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now()
    },
    postComments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
        required: true
    }],


})
module.exports = mongoose.model('posts', PostSchema)