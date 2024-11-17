const {Schema , model} = require("mongoose");


const bedSchema = new Schema({
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

const beddb = model('beddb', bedSchema);

module.exports = beddb;

