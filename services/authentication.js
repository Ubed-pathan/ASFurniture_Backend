const JWT = require('jsonwebtoken');
const secret = 'THOR@NDIRONM@N';

function createTokenForUser(user)
{
    const payload = {
        _id:user._id,
        email:user.email,
        profileImageURL:user.profileImageURL,
        role:user.role,
    };  

    const token = JWT.sign(payload, secret);
    return token;
}

function validateToken(log){
    try{
        const payload = JWT.verify(log, secret);
        return payload;
    }
    catch(err){
        return null;
    }
}

module.exports = {
    createTokenForUser,
    validateToken,
};