const fs = require('fs').promises;  // Use promises for async/await support
const path = require('path');
const beddb = require('../model/bed');
const counterdb = require('../model/counter');
const wardrobedb = require('../model/wardrobe');
const homedb = require('../model/home');
const otherdb = require('../model/other');
const dressing_tabledb = require('../model/dressing_table');
const userdb = require('../model/user'); // Assuming you want to remove from the cart as well

async function handleDeleteProduct(req, res) {
    try {
        const { productId, productType } = req.body; // Get productId and productType from the request body

        let product;
        let productCollection;

        // Determine which collection to query based on productType
        switch (productType) {
            case 'bed':
                productCollection = beddb;
                break;
            case 'counter':
                productCollection = counterdb;
                break;
            case 'wardrobe':
                productCollection = wardrobedb;
                break;
            case 'home':
                productCollection = homedb;
                break;
            case 'other':
                productCollection = otherdb;
                break;
            case 'dressingTable':
                productCollection = dressing_tabledb;
                break;
            default:
                return res.status(400).json({ message: "Invalid product type!" });
        }

        // Find the product in the correct collection
        product = await productCollection.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }

        // Assuming the image path is stored in 'imageURL'
        const imagePath = path.resolve(`./${product.imageURL}`);

        // Delete the image from the file system
        await fs.unlink(imagePath);  // Use promises and await here

        // Delete the product from the database
        const result = await productCollection.deleteOne({ _id: productId });

        // Remove the product from the user's cart (if needed)
        const user = await userdb.findOne({ "cart.productId": productId });
        if (user) {
            user.cart = user.cart.filter(item => item.productId !== productId);
            await user.save();
        }

        if (result.deletedCount === 1) {
            return res.status(200).json({ message: "Product and image deleted successfully!" });
        } else {
            return res.status(404).json({ message: "Product not found!" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting the product and image." });
    }
}

module.exports = handleDeleteProduct;
