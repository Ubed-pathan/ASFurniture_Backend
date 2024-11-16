const express = require('express');
// const User = require('../models/user')
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { handleUserSignUp, handleUserSignIn, handleUserLogout, handleProfileImage, returnProfileImage} = require('../controller/user'); 

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
            cb(null, path.resolve(`./public/userProfileImage/`))
    },
    filename: function (req, file, cb) {
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, fileName); // Save with original filename and timestamp
    },
});

const upload = multer({ storage: storage });


router.post('/profileImage', upload.single('profileImageURL'), handleProfileImage);

router.post("/signup", handleUserSignUp);
router.post("/signin", handleUserSignIn);
router.get("/logout", handleUserLogout);
router.get("/profileImage", returnProfileImage)

module.exports = router;