const express = require('express');
const path = require('path');
const handleDeleteProduct = require('../controller/deleteProduct')
const router = express.Router();

router.delete('/', handleDeleteProduct);

module.exports = router;