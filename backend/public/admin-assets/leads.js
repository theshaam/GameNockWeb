(async function () {
  const body = document.getElementById('leadsBody');

  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  async function load() {
    const res = await fetch('/api/admin/leads', { credentials: 'same-origin' });
    if (res.status === 401) { location.href = '/admin/login'; return; }
    const rows = await res.json();
    if (!rows.length) { body.innerHTML = '<tr><td colspan="8" class="muted">No leads yet.</td></tr>'; return; }
    body.innerHTML = rows.map(r => `
      <tr data-id="${r.id}">
        <td>${new Date(r.created_at).toLocaleString()}</td>
        <td>${esc(r.name)}</td>
        <td><a href="mailto:${esc(r.email)}">${esc(r.email)}</a></td>
        <td>${esc(r.company)}</td>
        <td>${esc(r.budget)}</td>
        <td class="details">${esc(r.details)}</td>
        <td>
          <select class="statusSel">
            <option value="new" ${r.status === 'new' ? 'selected' : ''}>New</option>
            <option value="contacted" ${r.status === 'contacted' ? 'selected' : ''}>Contacted</option>
            <option value="archived" ${r.status === 'archived' ? 'selected' : ''}>Archived</option>
          </select>
        </td>
        <td><button class="link-btn delBtn">Delete</button></td>
      </tr>
    `).join('');
  }

  body.addEventListener('change', async (e) => {
    if (!e.target.classList.contains('statusSel')) return;
    const id = e.target.closest('tr').dataset.id;
    await fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: e.target.value })
    });
  });

  body.addEventListener('click', async (e) => {
    if (!e.target.classList.contains('delBtn')) return;
    if (!confirm('Delete this lead?')) return;
    const id = e.target.closest('tr').dataset.id;
    await fetch(`/api/admin/leads/${id}`, { method: 'DELETE', credentials: 'same-origin' });
    load();
  });

  load();
})();
