const express = require('express');
const multer = require('multer');
const path = require('path');
const {handleInsertHomeData, hadleSendHomeData} = require('../controller/home')

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
            cb(null, path.resolve(`./public/home/`))
    },
    filename: function (req, file, cb) {
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, fileName); // Save with original filename and timestamp
    },
});

const upload = multer({ storage: storage });


router.post('/upload', upload.single('imageURL'), handleInsertHomeData);
router.get('/', hadleSendHomeData)

module.exports = router;
