const express = require('express');
// const User = require('../models/user')
const router = express.Router();
const { handleUserSignUp, handleUserSignIn} = require('../controller/user'); 

router.post("/signup", handleUserSignUp);
router.post("/signin", handleUserSignIn);

module.exports = router;