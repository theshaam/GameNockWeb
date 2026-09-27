const nodemailer = require('nodemailer');

// Lazy: only built once SMTP_* env vars are present, so a missing/incomplete
// mail config never crashes the app -- it just means notifications don't send.
let transporter = null;
function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });
  return transporter;
}

// Best-effort: a failed or unconfigured notification never blocks saving the
// lead, since the database row is the source of truth, not the email.
async function notifyNewLead(lead) {
  const t = getTransporter();
  const to = process.env.NOTIFY_TO;
  if (!t || !to) return;
  const lines = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Studio / company: ${lead.company || '-'}`,
    `Budget: ${lead.budget || '-'}`,
    `Source page: ${lead.source_page || '-'}`,
    `Campaign: ${[lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean).join(' / ') || '-'}`,
    '',
    'Project details:',
    lead.details || '-'
  ];
  try {
    await t.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      replyTo: lead.email,
      subject: `New enquiry: ${lead.company || lead.name}`,
      text: lines.join('\n')
    });
  } catch (err) {
    console.error('Failed to send lead notification email:', err);
  }
}

module.exports = { notifyNewLead };
