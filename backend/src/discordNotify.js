// Best-effort: a failed or unconfigured webhook never blocks saving the lead,
// since the database row is the source of truth, not the notification.
async function notifyDiscord(lead) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) return;

  const trim = (s, n) => (s && s.length > n ? s.slice(0, n - 1) + '…' : s || '-');
  const campaign = [lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean).join(' / ') || '-';

  const payload = {
    embeds: [{
      title: `New enquiry: ${lead.company || lead.name}`,
      color: 0x22d3ee,
      fields: [
        { name: 'Name', value: trim(lead.name, 256), inline: true },
        { name: 'Email', value: trim(lead.email, 256), inline: true },
        { name: 'Budget', value: trim(lead.budget, 256), inline: true },
        { name: 'Studio / company', value: trim(lead.company, 256), inline: true },
        { name: 'Source page', value: trim(lead.source_page, 256), inline: true },
        { name: 'Campaign', value: trim(campaign, 256), inline: true },
        { name: 'Project details', value: trim(lead.details, 1000) }
      ],
      timestamp: new Date().toISOString()
    }]
  };

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error('Failed to send Discord lead notification:', err);
  }
}

module.exports = { notifyDiscord };
