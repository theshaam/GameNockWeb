// Shared list + create/edit/delete wiring for the simple admin CRUD pages
// (testimonials, work, insights). Each page's script calls initCrud(opts).
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function initCrud({ apiBase, form, rowHtml, colspan }) {
  const formEl = document.getElementById('form');
  const tblBody = document.getElementById('tblBody');
  const newBtn = document.getElementById('newBtn');
  const cancelBtn = document.getElementById('cancelBtn');

  function showForm(data) {
    formEl.reset();
    formEl.hidden = false;
    if (data) {
      for (const [key, val] of Object.entries(data)) {
        const field = formEl.elements[key];
        if (!field) continue;
        if (field.type === 'checkbox') field.checked = !!val;
        else field.value = val ?? '';
      }
    }
    formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function hideForm() {
    formEl.hidden = true;
    formEl.reset();
  }

  async function load() {
    const res = await fetch(apiBase, { credentials: 'same-origin' });
    if (res.status === 401) { location.href = '/admin/login'; return; }
    const rows = await res.json();
    if (!rows.length) {
      tblBody.innerHTML = `<tr><td colspan="${colspan}" class="muted">Nothing here yet.</td></tr>`;
      return;
    }
    tblBody.innerHTML = rows.map(rowHtml).join('');
  }

  newBtn.addEventListener('click', () => showForm(null));
  cancelBtn.addEventListener('click', hideForm);

  tblBody.addEventListener('click', async (e) => {
    const tr = e.target.closest('tr');
    if (!tr) return;
    const id = tr.dataset.id;

    if (e.target.classList.contains('editBtn')) {
      const res = await fetch(`${apiBase}/${id}`, { credentials: 'same-origin' });
      const data = await res.json();
      showForm(data);
    }

    if (e.target.classList.contains('delBtn')) {
      if (!confirm('Delete this?')) return;
      await fetch(`${apiBase}/${id}`, { method: 'DELETE', credentials: 'same-origin' });
      load();
    }
  });

  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(formEl);
    const id = fd.get('id');
    const payload = {};
    for (const el of formEl.elements) {
      if (!el.name || el.name === 'id') continue;
      payload[el.name] = el.type === 'checkbox' ? el.checked : fd.get(el.name);
    }
    const res = await fetch(id ? `${apiBase}/${id}` : apiBase, {
      method: id ? 'PUT' : 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error || 'Could not save');
      return;
    }
    hideForm();
    load();
  });

  load();
}
