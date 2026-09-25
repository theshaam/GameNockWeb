const { getAdminIdFromRequest } = require('../auth');

// Protects /admin/* page routes: redirects to the login page when not signed in.
function requireAdminPage(req, res, next) {
  const adminId = getAdminIdFromRequest(req, process.env.SESSION_SECRET);
  if (!adminId) return res.redirect('/admin/login');
  req.adminId = adminId;
  next();
}

// Protects /api/admin/* JSON routes: responds 401 instead of redirecting.
function requireAdminApi(req, res, next) {
  const adminId = getAdminIdFromRequest(req, process.env.SESSION_SECRET);
  if (!adminId) return res.status(401).json({ error: 'Not authenticated' });
  req.adminId = adminId;
  next();
}

module.exports = { requireAdminPage, requireAdminApi };
