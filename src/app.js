// app.js
const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const app = express();

// Если нужно обрабатывать JSON в теле запроса
app.use(express.json());

// Регистрируем API маршруты
app.use('/api/files', fileRoutes);

module.exports = app;
