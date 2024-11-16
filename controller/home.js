const express = require('express');
const multer = require('multer');
const fs = require('fs');
const homedb = require('../model/home'); // Import the Mongoose model


// Middleware to handle form data and file uploads
async function handleInsertHomeData(req, res) {
    // Save the uploaded product data
    if (req.body.category.toLowerCase() == "home") {
        const savedItem = await homedb.create({
            imageURL: `/public/${req.body.category.toLowerCase()}/${req.file.filename}`, // Save image path
            category: req.body.category,  // Product category
            name: req.body.name,          // Product name
            specification: req.body.specification, // Product specification
            price: req.body.price         // Product price
        });

        res.status(200).json({
            message: "Product successfully uploaded and saved!"
        });
    }
    else {
        res.status(400).json({
            message: 'please check url or category',
        });
    }
}




async function hadleSendHomeData(req, res){
    try{
        const homeData = await homedb.find({}, '_id imageURL name specification price');
        res.status(200).json(homeData);
    }
    catch(error){
        res.status(500).json({ message: 'Error fetching Data.' });
    }
}


module.exports = {
    handleInsertHomeData,
    hadleSendHomeData,
}