// controllers/fileController.js
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../config/s3');
const pool = require('../config/db');

const BUCKET_NAME = process.env.MINIO_BUCKET || 'pepper-files';

const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: 'Файл не найден' });
    }

    // Можно генерировать уникальное имя файла для избежания коллизий
    const fileName = file.originalname;

    // Загружаем файл в MinIO
    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    // Сохраняем метаданные файла в PostgreSQL
    const query = `
      INSERT INTO files (filename, mimetype, bucket, key, created_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING id
    `;
    const values = [fileName, file.mimetype, BUCKET_NAME, fileName];
    const result = await pool.query(query, values);

    return res.json({ success: true, fileId: result.rows[0].id });
  } catch (error) {
    console.error('Ошибка при загрузке файла:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  uploadFile,
};
