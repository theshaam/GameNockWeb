const express = require('express');
const { pool } = require('../db');

const router = express.Router();

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// POST /api/leads — the contact form on gamenock.com submits here.
router.post('/leads', async (req, res) => {
  const { name, email, company, budget, details, fileNames } = req.body || {};

  if (!name || !String(name).trim()) return res.status(400).json({ error: 'Name is required' });
  if (!isValidEmail(email)) return res.status(400).json({ error: 'A valid email is required' });

  const fileNamesStr = Array.isArray(fileNames) ? fileNames.join(', ') : (fileNames || null);

  try {
    await pool.query(
      `INSERT INTO leads (name, email, company, budget, details, file_names) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        String(name).trim().slice(0, 160),
        String(email).trim().slice(0, 160),
        company ? String(company).trim().slice(0, 160) : null,
        budget ? String(budget).trim().slice(0, 60) : null,
        details ? String(details).trim() : null,
        fileNamesStr
      ]
    );
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error('Failed to save lead:', err);
    res.status(500).json({ error: 'Could not save your enquiry, please try again.' });
  }
});

// GET /api/testimonials — active testimonials, ordered for the homepage carousel.
router.get('/testimonials', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, headline, quote, client_name, client_role
       FROM testimonials WHERE is_active = 1 ORDER BY sort_order ASC, id ASC`
    );
    res.json(rows);
  } catch (err) {
    console.error('Failed to load testimonials:', err);
    res.status(500).json({ error: 'Could not load testimonials' });
  }
});

// GET /api/work — active project case studies, for the featured-work carousel.
router.get('/work', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, slug, title, summary, category, platforms, image_path
       FROM work_projects WHERE is_active = 1 ORDER BY sort_order ASC, id ASC`
    );
    res.json(rows);
  } catch (err) {
    console.error('Failed to load work projects:', err);
    res.status(500).json({ error: 'Could not load projects' });
  }
});

// GET /api/work/:slug — single project, with full body, for a case-study page.
router.get('/work/:slug', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM work_projects WHERE slug = ? AND is_active = 1 LIMIT 1`,
      [req.params.slug]
    );
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Failed to load project:', err);
    res.status(500).json({ error: 'Could not load project' });
  }
});

// GET /api/insights — active articles, for the insights listing.
router.get('/insights', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, slug, title, excerpt, category, read_minutes, cover_image, published_at
       FROM insights_articles WHERE is_active = 1 ORDER BY published_at DESC, id DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error('Failed to load insights:', err);
    res.status(500).json({ error: 'Could not load articles' });
  }
});

// GET /api/insights/:slug — single article, with full body.
router.get('/insights/:slug', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM insights_articles WHERE slug = ? AND is_active = 1 LIMIT 1`,
      [req.params.slug]
    );
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Failed to load article:', err);
    res.status(500).json({ error: 'Could not load article' });
  }
});

module.exports = router;
