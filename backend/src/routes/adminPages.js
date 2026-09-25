const express = require('express');
const { requireAdminPage } = require('../middleware/requireAdmin');
const { clearSessionCookie, getAdminIdFromRequest } = require('../auth');

const router = express.Router();

router.get('/login', (req, res) => {
  const adminId = getAdminIdFromRequest(req, process.env.SESSION_SECRET);
  if (adminId) return res.redirect('/admin/dashboard');
  res.render('login');
});

router.post('/logout', (req, res) => {
  clearSessionCookie(res);
  res.redirect('/admin/login');
});

router.get('/', (req, res) => res.redirect('/admin/dashboard'));
router.get('/dashboard', requireAdminPage, (req, res) => res.render('dashboard'));
router.get('/leads', requireAdminPage, (req, res) => res.render('leads'));
router.get('/testimonials', requireAdminPage, (req, res) => res.render('testimonials'));
router.get('/work', requireAdminPage, (req, res) => res.render('work'));
router.get('/insights', requireAdminPage, (req, res) => res.render('insights'));

module.exports = router;
