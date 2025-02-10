const express = require('express');
const { uploadFile, getFile } = require('../controllers/fileController');
const upload = require('../utils/storage');

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/:filename', getFile);

module.exports = router;
