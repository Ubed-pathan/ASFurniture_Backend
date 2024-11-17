const otherdb = require('../model/other'); // Import the Mongoose model

// Middleware to handle form data and file uploads
async function handleInsertOtherData(req, res) {
    // Save the uploaded product data
    if (req.body.productType.toLowerCase() == "other") {
        const savedItem = await otherdb.create({
            imageURL: `/public/${req.body.productType.toLowerCase()}/${req.file.filename}`, // Save image path
            productType: req.body.productType,  // Product category
            name: req.body.name,          // Product name
            specification: req.body.specification, // Product specification
            price: req.body.price         // Product price
        });

        res.status(200).json({
            message: 'Product successfully uploaded and saved!',
            data: savedItem
        });
    }
    else {
        res.status(400).json({
            message: 'please check url or category',
        });
    }
}



async function hadleSendOtherData(req, res){
    try{
        const otherData = await otherdb.find({}, '_id productType imageURL name specification price');
        res.status(200).json(otherData);
    }
    catch(error){
        res.status(500).json({ message: 'Error fetching Data.' });
    }
}


module.exports = {
    handleInsertOtherData,
    hadleSendOtherData,
}