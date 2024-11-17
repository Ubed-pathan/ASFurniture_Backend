const {Schema , model} = require("mongoose");


const otherSchema = new Schema({
    imageURL : {
        type:String,
        required:true,
    },
    productType :{
        type:String, 
        required:true,
    },
    name: {
        type:String,
        required:true,
    },
    specification :{
        type:String,
        required:true,
    },
    price:{
        type:String,
        require:true,
    }
}, { timestamps: true });

const otherdb = model('otherdb', otherSchema);

module.exports = otherdb;

