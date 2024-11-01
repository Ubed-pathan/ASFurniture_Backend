const userdb = require('../model/user');

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
          .cookie('Log', token, { httpOnly: true })  // Secure cookie
          .status(200)
          .json({ message: "logged in successfully" });
    } catch (err) {
        return res.status(400).json({ message: "Incorrect username or password" });
    }
}


module.exports = {
    handleUserSignUp,
    handleUserSignIn,
};
