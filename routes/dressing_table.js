const express = require('express');
const multer = require('multer');
const path = require('path');
const {handleInsertDressing_tableData, hadleSendDressing_tableData} = require('../controller/dressing_table')

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
            cb(null, path.resolve(`./public/dressing_table/`))
    },
    filename: function (req, file, cb) {
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, fileName); // Save with original filename and timestamp
    },
});

const upload = multer({ storage: storage });


router.post('/upload', upload.single('imageURL'), handleInsertDressing_tableData);
router.get('/', hadleSendDressing_tableData);

module.exports = router;
