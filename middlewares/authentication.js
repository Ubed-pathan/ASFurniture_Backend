const {createTokenForUser, validateToken} = require('../services/authentication')

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        const excludedRoutes = ['/contactform'];

        if (!tokenCookieValue) {
            if (excludedRoutes.includes(req.path)) {
                return res.status(400).json({message:'Please SingIn first ! then fill the form'}); // Skip authentication check for these routes
            }else{
               return next();
            }
            
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            if(userPayload != null){
                // req.user = userPayload;
                // console.log(userPayload);
                return next();
            }
            else{
                return res.status(400).json({message: "Not a valid token"});
            }
        } catch (error) {
            return res.status(400).json({message: "Not a valid token"});
        }


    };
}

module.exports = {
    checkForAuthenticationCookie,
};
