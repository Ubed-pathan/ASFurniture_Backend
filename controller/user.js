const userdb = require('../model/user');
const { validateToken } = require('../services/authentication')
const mongoose = require('mongoose');

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

        // Get the user data after generating the token
        const userData = await userdb.findOne({ username: username }).exec(); // Use `_id` instead of `_Id`
        // Check if user data exists and extract profile image URL
        const profileImage = userData ? userData.profileImageURL : null;

        return res
            .cookie('log', token, { httpOnly: true })
            .status(200)
            .json({ message: "Logged in successfully", token, username, profileImage });
    } catch (err) {
        console.error("Error during sign-in:", err);
        return res.status(400).json({ message: "Incorrect username or password" });
    }
}


async function handleUserLogout(req, res) {
    const tokenCookieValue = req.cookies['log'];
    if (tokenCookieValue != null) {
        try {
            const userPayload = validateToken(tokenCookieValue);
            if (userPayload != null) {
                return res
                    .clearCookie('log', { httpOnly: true })
                    .status(200)
                    .json({ message: "Logged out successfully" });
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

async function handleProfileImage(req, res) {
    const user = req.user;
    if (!user) {
        res.status(400).json({ message: "please login first" })
    } else {
        const userId = new mongoose.Types.ObjectId(user._id);
        try {
            if (req.file) {
                const imageURL = `/public/userProfileImage/${req.file.filename}`;

                const updatedUser = await userdb.findOneAndUpdate(
                    { _id: userId },
                    { $set: { profileImageURL: imageURL } },
                    { new: true } // Return the updated document
                ).exec();

                if (updatedUser) {
                    return res.status(200).json({  profileImage: updatedUser.profileImageURL , username : updatedUser.username });
                } else {
                    return res.status(404).json({ message: 'User not found' });
                }
            } else {
                return res.status(400).json({ message: 'No image file uploaded' });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Server error. Please try again.' });
        }

    }

}

async function returnProfileImage(req, res) {
    // const tokenCookieValue = req.cookies["log"];
    // console.log(req.user);
    // console.log("this is user")

    const user = req.user;
    
    // if (!userdata) {
    //     return res.status(400).json({ message: "Please login first" });
    // }

    // const user = validateToken(userdata);
    if (!user) {
        return res.status(404).json({ message: "Not a valid user" });
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        // Corrected query with _id filter
        const userData = await userdb.findOne({ _id: userId }).exec();

        // Check if user data exists
        if (userData && userData.profileImageURL) {
            return res.status(200).json({ profileImage: userData.profileImageURL, username : userData.username });
        } else {
            return res.status(404).json({ message: "Profile image not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Server error. Please try again." });
    }
}



module.exports = {
    handleUserSignUp,
    handleUserSignIn,
    handleUserLogout,
    handleProfileImage,
    returnProfileImage,
};
