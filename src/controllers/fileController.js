const path = require('path');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const storage = require('../utils/storage');

const upload = multer({ storage });

const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ url: fileUrl });
};

const getFile = (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', fileName);

  res.sendFile(filePath, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' });
    }
  });
};

module.exports = { uploadFile, getFile };
