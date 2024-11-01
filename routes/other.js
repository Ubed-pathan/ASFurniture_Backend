const express = require('express');
const multer = require('multer');
const path = require('path');
const {handleInsertOtherData, hadleSendOtherData} = require('../controller/other')

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
            cb(null, path.resolve(`./public/other/`))
    },
    filename: function (req, file, cb) {
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, fileName); // Save with original filename and timestamp
    },
});

const upload = multer({ storage: storage });


router.post('/upload', upload.single('imageURL'), handleInsertOtherData);
router.get('/', hadleSendOtherData);

module.exports = router;
