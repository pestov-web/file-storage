// config/db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgres://user:password@localhost:5432/yourdbname',
});

module.exports = pool;
