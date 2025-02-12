// controllers/fileController.js
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../config/s3');
const pool = require('../config/db');
require('dotenv').config();

const BUCKET_NAME = process.env.MINIO_BUCKET || 'pepper-files';

const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: 'Файл не найден' });
    }

    // Генерируем уникальное имя файла (например, добавляем timestamp)
    const fileName = `${Date.now()}-${file.originalname}`;

    // Загружаем файл в MinIO
    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    // Генерируем URL файла
    const fileUrl = `http://${process.env.MINIO_ENDPOINT}/${BUCKET_NAME}/${fileName}`;

    // Сохраняем в PostgreSQL
    const query = `
      INSERT INTO files (filename, mimetype, bucket, key, file_url, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING id, file_url
    `;
    const values = [fileName, file.mimetype, BUCKET_NAME, fileName, fileUrl];
    const result = await pool.query(query, values);

    return res.json({
      success: true,
      fileId: result.rows[0].id,
      fileUrl: result.rows[0].file_url,
    });
  } catch (error) {
    console.error('Ошибка при загрузке файла:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  uploadFile,
};
