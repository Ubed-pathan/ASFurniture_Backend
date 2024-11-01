const {Schema , model} = require("mongoose");
const {createHmac, randomBytes} = require("crypto");
const { createTokenForUser } = require("../services/authentication");

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,

    },
    password:{
        type:String,
        required: true,
    },
    profileImageURL:{
        type:String,
    },
    role:{
        type:String,
        enum: ["USER", "ADMIN"],
        default:"USER",
    }
}, 
    {timestamps: true }
);
 

userSchema.pre("save", function (next){
    // here this mean current user 
    const user = this; 
    
    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();

    const hashedPassword = createHmac("sha256", salt)
                            .update(user.password)
                            .digest("hex");
    
    this.salt = salt;
    this.password = hashedPassword;

    // this next() mean store data into mongodb
    next();

})


userSchema.static('matchPasswordAndGenerateToken', async function(username, password){

    const user = await this.findOne({username});

    if(!user) throw new Error('User not Found!');

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
                            .update(password)
                            .digest("hex");
                            
                            
    if(hashedPassword !== userProvidedHash) throw new Error('Incorrect Password')

    const token = createTokenForUser(user);
    return token;
    
})


const User = model('user', userSchema);

module.exports = User;