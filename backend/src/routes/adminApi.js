const express = require('express');
const { pool } = require('../db');
const { verifyPassword, setSessionCookie, clearSessionCookie } = require('../auth');
const { requireAdminApi } = require('../middleware/requireAdmin');

const router = express.Router();

// ---- Auth ----

router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'Username and password are required' });

  try {
    const [rows] = await pool.query('SELECT * FROM admins WHERE username = ? LIMIT 1', [username]);
    const admin = rows[0];
    if (!admin || !verifyPassword(password, admin.password_hash)) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    setSessionCookie(res, admin.id, process.env.SESSION_SECRET);
    res.json({ ok: true });
  } catch (err) {
    console.error('Login failed:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/logout', (req, res) => {
  clearSessionCookie(res);
  res.json({ ok: true });
});

router.get('/me', requireAdminApi, (req, res) => {
  res.json({ adminId: req.adminId });
});

// ---- Leads ----

router.get('/leads', requireAdminApi, async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
  res.json(rows);
});

router.patch('/leads/:id', requireAdminApi, async (req, res) => {
  const { status } = req.body || {};
  if (!['new', 'contacted', 'archived'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  await pool.query('UPDATE leads SET status = ? WHERE id = ?', [status, req.params.id]);
  res.json({ ok: true });
});

router.delete('/leads/:id', requireAdminApi, async (req, res) => {
  await pool.query('DELETE FROM leads WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
});

// ---- Generic CRUD factory for testimonials / work_projects / insights_articles ----

// mysql2 will happily bind a JS boolean, but be explicit and portable: booleans
// (and the checkbox strings "true"/"false" an admin form field can send) become 0/1.
function normalizeValue(v) {
  if (typeof v === 'boolean') return v ? 1 : 0;
  if (v === 'true') return 1;
  if (v === 'false') return 0;
  return v;
}

function crud({ table, fields, defaults = {} }) {
  const sub = express.Router();

  sub.get('/', requireAdminApi, async (req, res) => {
    const [rows] = await pool.query(`SELECT * FROM ${table} ORDER BY id DESC`);
    res.json(rows);
  });

  sub.get('/:id', requireAdminApi, async (req, res) => {
    const [rows] = await pool.query(`SELECT * FROM ${table} WHERE id = ? LIMIT 1`, [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  });

  sub.post('/', requireAdminApi, async (req, res) => {
    const values = fields.map(f => normalizeValue(req.body[f] ?? defaults[f] ?? null));
    try {
      const [result] = await pool.query(
        `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`,
        values
      );
      res.status(201).json({ ok: true, id: result.insertId });
    } catch (err) {
      console.error(`Failed to create ${table} row:`, err);
      res.status(400).json({ error: err.sqlMessage || 'Could not save' });
    }
  });

  sub.put('/:id', requireAdminApi, async (req, res) => {
    const values = fields.map(f => normalizeValue(req.body[f] ?? defaults[f] ?? null));
    try {
      await pool.query(
        `UPDATE ${table} SET ${fields.map(f => `${f} = ?`).join(', ')} WHERE id = ?`,
        [...values, req.params.id]
      );
      res.json({ ok: true });
    } catch (err) {
      console.error(`Failed to update ${table} row:`, err);
      res.status(400).json({ error: err.sqlMessage || 'Could not save' });
    }
  });

  sub.delete('/:id', requireAdminApi, async (req, res) => {
    await pool.query(`DELETE FROM ${table} WHERE id = ?`, [req.params.id]);
    res.json({ ok: true });
  });

  return sub;
}

router.use('/testimonials', crud({
  table: 'testimonials',
  fields: ['headline', 'quote', 'client_name', 'client_role', 'sort_order', 'is_active'],
  defaults: { sort_order: 0, is_active: 1 }
}));

router.use('/work', crud({
  table: 'work_projects',
  fields: ['slug', 'title', 'summary', 'category', 'platforms', 'image_path', 'body', 'sort_order', 'is_active'],
  defaults: { sort_order: 0, is_active: 1 }
}));

router.use('/insights', crud({
  table: 'insights_articles',
  fields: ['slug', 'title', 'excerpt', 'category', 'read_minutes', 'cover_image', 'body', 'is_active'],
  defaults: { read_minutes: 5, is_active: 1 }
}));

module.exports = router;
