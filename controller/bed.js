const beddb = require('../model/bed'); // Import the Mongoose model

// Middleware to handle form data and file uploads
async function handleInsertBedData(req, res) {
    // Save the uploaded product data
    if (req.body.category.toLowerCase() == "bed") {
        const savedItem = await beddb.create({
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




async function hadleSendBedData(req, res){
    try{
        const bedData = await beddb.find({}, '_id imageURL name specification price');
        res.status(200).json(bedData);
    }
    catch(error){
        res.status(500).json({ message: 'Error fetching Data.' });
    }
}


module.exports = {
    handleInsertBedData,
    hadleSendBedData,
}