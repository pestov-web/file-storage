// config/s3.js
const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();

const s3Client = new S3Client({
  region: process.env.MINIO_REGION || 'us-east-1', // Для MinIO значение не играет особой роли
  endpoint: process.env.MINIO_ENDPOINT || 'http://192.168.1.100:9000',
  forcePathStyle: true, // Важно для работы с MinIO
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY || 'admin',
    secretAccessKey: process.env.MINIO_SECRET_KEY || 'password',
  },
});

module.exports = s3Client;
