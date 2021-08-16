const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const BookMeSchema = new Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    service:{
        type: String,
        required: true
    },
    phonenumber:{
        type: Number,
        required: false
    },
    date:{
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
module.exports = mongoose.model('BookMes',BookMeSchema);