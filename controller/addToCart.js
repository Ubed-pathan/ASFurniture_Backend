const mongoose = require('mongoose');
const userdb = require('../model/user');
const beddb = require('../model/bed');
const counterdb = require('../model/counter');
const wardrobedb = require('../model/wardrobe');
const homedb = require('../model/home');
const otherdb = require('../model/other');
const dressing_tabledb = require('../model/dressing_table');


async function handleAddProduct(req, res) {
    const userTokenData = req.user;
    const { productId, productType } = req.body;
    const userId = new mongoose.Types.ObjectId(userTokenData._id);
    if (!['bed', 'counter', 'wardrobe', 'dressing_table', 'home', 'other'].includes(productType)) {
        return res.status(400).json({ message: "Invalid product type" });
    }

    try {
        // Find the user by ID
        const user = await userdb.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        if (!user.cart) {
            user.cart = [];
            console.log('user card initialize')
        }

        // Check if the product is already in the cart
        const productIndex = user.cart.findIndex(item => 
            item.productId.equals(new mongoose.Types.ObjectId(productId)) && 
            item.productType === productType
        );

        if (productIndex >= 0) {
            // Product already in cart, update the quantity
            user.cart[productIndex].quantity += 1;
        } else {
            // Product not in cart, add it
            user.cart.push({ productId, productType, quantity: 1 });
        }

        // Save the updated user data
        // user.markModified('cart');
        // console.log("before save")
        // const savedUser = await user.save();
        // console.log(user)
        // console.log("after save")

        const updatedUser = await userdb.updateOne(
            { _id: userId },
            { $set: { cart: user.cart } }
        );
        // res.status(200).json({ message: "Product added to cart successfully!" });
        if (updatedUser.modifiedCount > 0) {
            res.status(200).json({ message: "Product added to cart successfully!" });
        } else {
            res.status(400).json({ message: "Failed to update cart" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }


}


async function hadleSendProductToCart(req, res) {
    try {
        const userTokenData = req.user;
        const userId = new mongoose.Types.ObjectId(userTokenData._id);
        const user = await userdb.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const populatedCart = await Promise.all(user.cart.map(async (item) => {
            let product;
            switch (item.productType) {
                case 'bed':
                    product = await beddb.findById(item.productId);
                    break;
                case 'counter':
                    product = await counterdb.findById(item.productId);
                    break;
                case 'wardrobe':
                    product = await wardrobedb.findById(item.productId);
                    break;
                case 'dressing_table':
                    product = await dressing_tabledb.findById(item.productId);
                    break;
                case 'home':
                    product = await homedb.findById(item.productId);
                    break;
                case 'other':
                    product = await otherdb.findById(item.productId);
                    break;
                default:
                    product = null;
            }
            return { ...item.toObject(), product }; // Combine product info with cart item
        }));

        res.status(200).json(populatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

async function deleteItemFromAddToCart(req, res) {
    const userTokenData = req.user;
    const { productId, productType } = req.body;
    const userId = new mongoose.Types.ObjectId(userTokenData._id);
    
    try {
        // Find the user by ID
        const user = await userdb.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Find the index of the product in the cart
        const productIndex = user.cart.findIndex(item => 
            item.productId.equals(new mongoose.Types.ObjectId(productId)) && 
            item.productType === productType
        );

        // If product is not in the cart
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart!" });
        }

        // Remove the product from the cart
        user.cart.splice(productIndex, 1);

        // Save the updated cart
        const updatedUser = await userdb.updateOne(
            { _id: userId },
            { $set: { cart: user.cart } }
        );

        if (updatedUser.modifiedCount > 0) {
            res.status(200).json({ message: "Product removed from cart successfully!" });
        } else {
            res.status(400).json({ message: "Failed to remove product from cart" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


module.exports = {
    handleAddProduct,
    hadleSendProductToCart,
    deleteItemFromAddToCart,
}

