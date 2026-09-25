// cPanel "Setup Node.js App" (Phusion Passenger) entry point.
// Passenger imports this file and expects it to start (and keep open) an
// HTTP server bound to process.env.PORT, which Passenger sets itself.
require('dotenv').config();

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { ensureSchema } = require('./src/db');
const publicRoutes = require('./src/routes/public');
const adminApiRoutes = require('./src/routes/adminApi');
const adminPageRoutes = require('./src/routes/adminPages');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Public JSON API (called from the Astro frontend in the browser) — only
// allow the configured site origin(s), not the whole internet.
const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
app.use('/api', cors({
  origin: allowedOrigins.length ? allowedOrigins : false,
  credentials: false
}));
app.use('/api', publicRoutes);
app.use('/api/admin', adminApiRoutes);

// Admin panel (server-rendered pages + its own static assets)
app.use('/admin-assets', express.static(path.join(__dirname, 'public', 'admin-assets')));
app.use('/admin', adminPageRoutes);

app.get('/', (req, res) => res.redirect('/admin/login'));

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

const port = process.env.PORT || 4000;

ensureSchema()
  .then(() => {
    app.listen(port, () => {
      console.log(`Game Nock backend ready on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialise the database schema:', err);
    process.exit(1);
  });
