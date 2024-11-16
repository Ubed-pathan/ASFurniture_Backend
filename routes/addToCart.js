const express = require('express');
const path = require('path');
const {handleAddProduct, hadleSendProductToCart} = require('../controller/addToCart')

const router = express.Router();

router.post('/', handleAddProduct );
router.get('/', hadleSendProductToCart);

module.exports = router;