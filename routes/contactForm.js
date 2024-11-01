const express = require('express');

const router = express.Router();

const handleContactForm = require('../controller/contactForm');

router.post("/", handleContactForm);

module.exports = router;