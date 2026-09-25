(async function () {
  async function count(path) {
    const res = await fetch(path, { credentials: 'same-origin' });
    if (!res.ok) return '–';
    const data = await res.json();
    return Array.isArray(data) ? data.length : '–';
  }
  document.getElementById('cLeads').textContent = await count('/api/admin/leads');
  document.getElementById('cTestimonials').textContent = await count('/api/admin/testimonials');
  document.getElementById('cWork').textContent = await count('/api/admin/work');
  document.getElementById('cInsights').textContent = await count('/api/admin/insights');
})();
