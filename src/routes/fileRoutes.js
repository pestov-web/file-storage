// routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const fileController = require('../controllers/fileController');

// Маршрут для загрузки файла (POST /api/files/upload)
router.post('/upload', upload.single('file'), fileController.uploadFile);

module.exports = router;
