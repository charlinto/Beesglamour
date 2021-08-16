const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostserviceSchema = new Schema({
    // postserviceService:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "categories",
    //     required: true
    // },
    postserviceName:{
        type: String,
        required: true
    },
    // postserviceImage:{
    //     type: String,
    //     required: true
    // },
    // postserviceAuthor:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"admin"
    // },
    postserviceDesc:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('postservices', PostserviceSchema)