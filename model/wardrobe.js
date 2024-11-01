const {Schema , model} = require("mongoose");


const wardrobeSchema = new Schema({
    imageURL : {
        type:String,
        required:true,
    },
    category :{
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

const wardrobedb = model('wardrobedb', wardrobeSchema);

module.exports = wardrobedb;

