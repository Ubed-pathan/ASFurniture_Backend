const {Schema , model} = require("mongoose");


const dressing_tableSchema = new Schema({
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

const dressing_tabledb = model('dressing_tabledb', dressing_tableSchema);

module.exports = dressing_tabledb;

