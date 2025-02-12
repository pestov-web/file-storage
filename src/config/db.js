// config/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgres://user:password@localhost:5432/yourdbname',
});

module.exports = pool;
