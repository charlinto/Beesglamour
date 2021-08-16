const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    commentName:{
        type: String,
        required: true
    },
    commentEmail:{
        type: String,
        required: true
    },
    commentWebsite:{
        type: String,
        required: false
    },
    commentContent:{
        type: String,
        required: true
    },
    commentUser:{
        type: String,
        ref:'users',
    },
    created_at:{
        type: Date,
        default: Date.now()
    }

})
module.exports = mongoose.model('comments', CommentSchema)