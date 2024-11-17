const dressing_tabledb = require('../model/dressing_table'); // Import the Mongoose model

// Middleware to handle form data and file uploads
async function handleInsertDressing_tableData(req, res) {
    // Save the uploaded product data
    if (req.body.productType.toLowerCase() == "dressing_table") {
        const savedItem = await dressing_tabledb.create({
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



async function hadleSendDressing_tableData(req, res){
    try{
        const dressing_tableData = await dressing_tabledb.find({}, '_id productType imageURL name specification price');
        res.status(200).json(dressing_tableData);
    }
    catch(error){
        res.status(500).json({ message: 'Error fetching Data.' });
    }
}


module.exports = {
    handleInsertDressing_tableData,
    hadleSendDressing_tableData
}