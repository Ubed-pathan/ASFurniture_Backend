const fs = require('fs').promises;
const mongoose = require('mongoose');
const path = require('path');
const beddb = require('../model/bed');
const counterdb = require('../model/counter');
const wardrobedb = require('../model/wardrobe');
const homedb = require('../model/home');
const otherdb = require('../model/other');
const dressing_tabledb = require('../model/dressing_table');
const userdb = require('../model/user');

async function handleDeleteProduct(req, res) {
    try {
        const { productId, productType } = req.body;
        let productCollection;

        // Determine the collection based on productType
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
            case 'dressing_table':
                productCollection = dressing_tabledb;
                break;
            default:
                return res.status(400).json({ message: "Invalid product type!" });
        }

        // Find the product
        const product = await productCollection.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }

        // Delete the image from the file system
        // here path.resolve(`./${product.imageURL}`); mean D:/ASFurniture/backend/public/home/img01
        const imagePath = path.resolve(`./${product.imageURL}`);
        await fs.unlink(imagePath);

        // Delete the product from the product collection
        const result = await productCollection.deleteOne({ _id: productId });
        if (result.deletedCount !== 1) {
            return res.status(404).json({ message: "Product not found!" });
        }

        // Remove the product from all users' carts
        const updateResult = await userdb.updateMany(
            { "cart.productId": productId },
            { $pull: { cart: { productId: productId } } }
        );

        return res.status(200).json({ message: "Product and image deleted successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting the product and image." });
    }
}

module.exports = handleDeleteProduct;
