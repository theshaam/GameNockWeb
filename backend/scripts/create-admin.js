// Run once after deploying to create (or reset) the first admin login:
//   node scripts/create-admin.js <username> <password>
require('dotenv').config();
const { pool, ensureSchema } = require('../src/db');
const { hashPassword } = require('../src/auth');

async function main() {
  const [username, password] = process.argv.slice(2);
  if (!username || !password) {
    console.error('Usage: node scripts/create-admin.js <username> <password>');
    process.exit(1);
  }
  if (password.length < 8) {
    console.error('Password must be at least 8 characters.');
    process.exit(1);
  }

  await ensureSchema();
  const passwordHash = hashPassword(password);

  await pool.query(
    `INSERT INTO admins (username, password_hash) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
    [username, passwordHash]
  );

  console.log(`Admin user "${username}" is ready. You can log in at /admin/login.`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Failed to create admin user:', err);
  process.exit(1);
});
