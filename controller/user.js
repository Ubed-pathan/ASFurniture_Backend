const userdb = require('../model/user');
const {validateToken} = require('../services/authentication')

async function handleUserSignUp(req, res) {
    const userData = req.body;
    if (userData.username && userData.email && userData.password) {
        try {
            await userdb.create({
                username: userData.username,
                email: userData.email,
                password: userData.password,
            });

            return res.status(200).json({ message: 'User created successfully' }); // Send success message
        } catch (error) {
            return res.status(500).json({ message: 'Server error. Please try again.' });
        }
    } else {
        return res.status(400).json({ message: 'New User Not Created' });
    }
}

async function handleUserSignIn(req, res) {
    try {
        const { username, password } = req.body;
        const token = await userdb.matchPasswordAndGenerateToken(username, password);

        return res
            .cookie('log', token, { httpOnly: true })  // Secure cookie
            .status(200)
            .json({ message: "logged in successfully", token });
    } catch (err) {
        return res.status(400).json({ message: "Incorrect username or password" });
    }
}

async function handleUserLogout(req, res) {
    const tokenCookieValue = req.cookies['log'];
    if(tokenCookieValue != null){
        try {
            const userPayload = validateToken(tokenCookieValue);
            if (userPayload != null) {
                return res
                    .clearCookie('log', { httpOnly: true })
                    .status(200)
                    .json({ message: "Logged out successfully"});   
            }
            else {
                return res.status(400).json({ message: "Not a valid user" });
            }
        } catch (error) {
            return res.status(400).json({ message: "Server error! try again" });
        }
    }
    else {
        return res.status(400).json({ message: "Not a valid user" });
    }

    

}


module.exports = {
    handleUserSignUp,
    handleUserSignIn,
    handleUserLogout,
};
