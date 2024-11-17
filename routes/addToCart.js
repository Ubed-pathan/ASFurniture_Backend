const express = require('express');
const path = require('path');
const {handleAddProduct, hadleSendProductToCart, deleteItemFromAddToCart} = require('../controller/addToCart')

const router = express.Router();

router.post('/', handleAddProduct );
router.get('/', hadleSendProductToCart);
router.delete('/', deleteItemFromAddToCart)

module.exports = router;