const wardrobedb = require('../model/wardrobe'); // Import the Mongoose model

// Middleware to handle form data and file uploads
async function handleInsertWardrobeData(req, res) {
    // Save the uploaded product data
    if (req.body.category.toLowerCase() == "wardrobe") {
        const savedItem = await wardrobedb.create({
            imageURL: `/public/${req.body.category.toLowerCase()}/${req.file.filename}`, // Save image path
            category: req.body.category,  // Product category
            name: req.body.name,          // Product name
            specification: req.body.specification, // Product specification
            price: req.body.price         // Product price
        });

        res.status(201).json({
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

async function hadleSendWardrobeData(req, res){
    try{
        const wardrobeData = await wardrobedb.find({}, '_id imageURL name specification price');
        res.status(200).json(wardrobeData);
    }
    catch(error){
        res.status(500).json({ message: 'Error fetching Data.' });
    }
}



module.exports = {
    handleInsertWardrobeData,
    hadleSendWardrobeData,
}