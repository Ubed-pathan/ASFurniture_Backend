const express = require('express');
// const User = require('../models/user')
const router = express.Router();
const { handleUserSignUp, handleUserSignIn, handleUserLogout} = require('../controller/user'); 

router.post("/signup", handleUserSignUp);
router.post("/signin", handleUserSignIn);
router.post("/logout", handleUserLogout);
router.get("/logout", handleUserLogout);

module.exports = router;