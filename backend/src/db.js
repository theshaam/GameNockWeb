const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 8,
  maxIdle: 4,
  idleTimeout: 60000,
  charset: 'utf8mb4_general_ci'
});

// Runs the schema file on startup so a fresh database is ready with no manual
// step beyond creating the empty database + user in cPanel.
// Columns added after the table already existed on some installs.
// CREATE TABLE IF NOT EXISTS above is a no-op once the table exists, so these
// run as their own idempotent step (ignoring "column already exists").
const MIGRATIONS = [
  "ALTER TABLE leads ADD COLUMN source_page VARCHAR(300) NULL",
  "ALTER TABLE leads ADD COLUMN utm_source VARCHAR(120) NULL",
  "ALTER TABLE leads ADD COLUMN utm_medium VARCHAR(120) NULL",
  "ALTER TABLE leads ADD COLUMN utm_campaign VARCHAR(120) NULL"
];

async function ensureSchema() {
  const sqlPath = path.join(__dirname, '..', 'sql', 'schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(Boolean);
  const conn = await pool.getConnection();
  try {
    for (const statement of statements) {
      await conn.query(statement);
    }
    for (const statement of MIGRATIONS) {
      try {
        await conn.query(statement);
      } catch (err) {
        if (err.code !== 'ER_DUP_FIELDNAME') throw err;
      }
    }
  } finally {
    conn.release();
  }
}

module.exports = { pool, ensureSchema };
