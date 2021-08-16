const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const GetintouchSchema = new Schema({
    fullname:{
        type: String,
        required: true
    },
    phonenumber:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
   
    },
    message:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now()
    }

})
module.exports ={Getintouch: mongoose.model('getintouchs',GetintouchSchema)};