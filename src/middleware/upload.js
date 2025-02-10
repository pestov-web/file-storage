// middleware/upload.js
const multer = require('multer');
const upload = multer(); // Здесь можно указать опции, например, limits или путь для временного хранения

module.exports = upload;
