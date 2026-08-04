import { NextResponse } from "next/server";

// ============================================================
// PLACEHOLDER LEAD HANDLER — see Document 10, Section 6.
//
// This currently just logs each submission to the server console
// (visible in your hosting provider's function logs, e.g. Vercel).
// It does NOT yet email, Slack, or CRM anything to a real person.
//
// TO MAKE THIS REAL, pick ONE of:
//   1. Email — wire up Resend/SendGrid/Postmark here and send to
//      SITE_CONFIG.leadNotifyEmail (data/config.js).
//   2. Google Sheet — POST to a Google Apps Script web app or
//      Sheets API endpoint.
//   3. CRM — POST to HubSpot/Pipedrive/Airtable's API.
// Whichever you pick, replace the body of this function — the
// wizard and contact form already send the right payload shape.
// ============================================================

export async function POST(request) {
  try {
    const body = await request.json();

    // Minimal validation
    if (!body?.contact?.email) {
      return NextResponse.json({ error: "Missing contact email" }, { status: 400 });
    }

    // Wizard file attachments carry base64 dataUrls (see
    // components/WizardFileUpload.js — no storage backend exists yet, so
    // they ride along in the payload). Strip those out of what we log so
    // a few attached PDFs don't flood the console; the full payload
    // (dataUrl included) is still what a real handler would receive.
    const logSafeBody = {
      ...body,
      files: Array.isArray(body.files)
        ? body.files.map(({ name, size, type }) => ({ name, size, type }))
        : body.files,
    };

    // eslint-disable-next-line no-console
    console.log("[NEW LEAD]", JSON.stringify(logSafeBody, null, 2));

    // PLACEHOLDER: replace the console.log above with a real
    // email/CRM/Sheet call once SITE_CONFIG.leadNotifyEmail is set.
    // Uploaded files (body.files[].dataUrl) also need a real storage
    // destination (S3/Cloudinary/etc.) before launch — see PLACEHOLDERS.md.

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
