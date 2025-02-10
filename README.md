# Pepper Files Microservice

Этот микросервис отвечает за хранение файлов для сайта про острые перцы. Он позволяет загружать изображения статей и аватарки пользователей. Файлы хранятся в **MinIO** (S3-совместимое хранилище), а их метаданные сохраняются в **PostgreSQL**.

## 🔧 Технологии

- **Express** – веб-фреймворк для Node.js
- **MinIO** – S3-совместимое хранилище файлов
- **PostgreSQL** – база данных для хранения информации о файлах
- **Multer** – middleware для загрузки файлов
- **AWS SDK v3** – клиент для работы с S3 (и MinIO)

## 🗂️ Структура проекта

```

project/
│
├── config/
│ ├── db.js // Подключение к PostgreSQL
│ └── s3.js // Настройка MinIO (S3)
│
├── controllers/
│ └── fileController.js // Логика загрузки файлов
│
├── routes/
│ └── fileRoutes.js // Роуты API
│
├── middleware/
│ └── upload.js // Настройка Multer
│
├── app.js // Основной файл приложения
├── server.js // Запуск сервера
├── package.json // Зависимости и скрипты
└── .env // Переменные окружения

```

## 🚀 Установка и запуск

### 1. Клонирование репозитория и установка зависимостей

```bash
git clone <URL-репозитория>
cd project
npm install
```

### 2. Настройка переменных окружения

Создай файл `.env` в корне проекта и добавь:

```env
DATABASE_URL=postgres://user:password@localhost:5432/yourdbname
MINIO_ENDPOINT=http://localhost:9000
MINIO_ACCESS_KEY=admin
MINIO_SECRET_KEY=secret
MINIO_BUCKET=pepper-files
PORT=3000
```

### 3. Настройка PostgreSQL

Создай базу данных и таблицу `files`:

```sql
CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  mimetype TEXT,
  bucket TEXT,
  key TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Запуск MinIO через Docker

```bash
docker run -p 9000:9000 -p 9001:9001 --name minio \
  -e "MINIO_ROOT_USER=admin" \
  -e "MINIO_ROOT_PASSWORD=secret" \
  quay.io/minio/minio server /data --console-address ":9001"
```

После запуска:

- **API MinIO** доступно на [http://localhost:9000](http://localhost:9000)
- **Консоль управления** — [http://localhost:9001](http://localhost:9001)

### 5. Запуск сервера

```bash
npm start
```

Сервер будет работать на `http://localhost:3000`.

## 📡 API

### 🔼 Загрузка файла

- **URL:** `/api/files/upload`
- **Метод:** `POST`
- **Формат:** `multipart/form-data`  
  **Параметры:**
  - `file` – загружаемый файл

**Пример ответа:**

```json
{
  "success": true,
  "fileId": 1
}
```

## 🤝 Вклад в проект

Если у тебя есть идеи по улучшению или ты хочешь внести свой вклад, создавай pull request или открывай issue.

## 📄 Лицензия

Проект распространяется под [MIT License](LICENSE).
