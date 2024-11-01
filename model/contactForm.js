const {Schema , model} = require("mongoose");

const contactFormSchema = new Schema({
    name : {
        type:String,
        required:true,
    },
    email :{
        type:String, 
        required:true,
    },
    gender: {
        type:String,
        required:true,
    },
    mobile :{
        type:String,
        required:true,
    },
    suggestion:{
        type:String,
        require:true,
    }
}, { timestamps: true });


const contactformdb = model('contactformdb', contactFormSchema);

module.exports = contactformdb;