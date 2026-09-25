const crypto = require('crypto');

const SCRYPT_KEYLEN = 64;

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(password, salt, SCRYPT_KEYLEN).toString('hex');
  return `${salt}:${derived}`;
}

function verifyPassword(password, stored) {
  const [salt, derivedHex] = String(stored).split(':');
  if (!salt || !derivedHex) return false;
  const derived = crypto.scryptSync(password, salt, SCRYPT_KEYLEN);
  const stored_ = Buffer.from(derivedHex, 'hex');
  if (derived.length !== stored_.length) return false;
  return crypto.timingSafeEqual(derived, stored_);
}

const SESSION_COOKIE = 'gn_admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function sign(value, secret) {
  return crypto.createHmac('sha256', secret).update(value).digest('hex');
}

function createSessionToken(adminId, secret) {
  const payload = `${adminId}.${Date.now() + SESSION_TTL_MS}`;
  const sig = sign(payload, secret);
  return Buffer.from(`${payload}.${sig}`).toString('base64url');
}

function readSessionToken(token, secret) {
  if (!token) return null;
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const [adminId, expiry, sig] = decoded.split('.');
    if (!adminId || !expiry || !sig) return null;
    const expected = sign(`${adminId}.${expiry}`, secret);
    const sigBuf = Buffer.from(sig);
    const expBuf = Buffer.from(expected);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) return null;
    if (Date.now() > Number(expiry)) return null;
    return Number(adminId);
  } catch {
    return null;
  }
}

function setSessionCookie(res, adminId, secret) {
  const token = createSessionToken(adminId, secret);
  res.cookie(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_TTL_MS
  });
}

function clearSessionCookie(res) {
  res.clearCookie(SESSION_COOKIE);
}

function getAdminIdFromRequest(req, secret) {
  return readSessionToken(req.cookies ? req.cookies[SESSION_COOKIE] : null, secret);
}

module.exports = {
  hashPassword,
  verifyPassword,
  setSessionCookie,
  clearSessionCookie,
  getAdminIdFromRequest,
  SESSION_COOKIE
};
