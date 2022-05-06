const mongoose = require('mongoose');
// const http = require('https')

const collegeSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
        unique : true
    }, 
    fullName : {
        type : String,
        required : true,
    },
    logoLink: {
        type: String,
        required: "URL can't be empty",
        unique: true

        
    },
    isDeleted : {
        type : Boolean,
        default : false
    },
    
    
},{timestamps:true})
collegeSchema.path('logoLink').validate((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');

module.exports = mongoose.model("College", collegeSchema)