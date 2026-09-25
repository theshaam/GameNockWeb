initCrud({
  apiBase: '/api/admin/testimonials',
  colspan: 5,
  rowHtml: (r) => `
    <tr data-id="${r.id}">
      <td>${r.sort_order}</td>
      <td>${esc(r.headline)}</td>
      <td>${esc(r.client_name)}${r.client_role ? ' · ' + esc(r.client_role) : ''}</td>
      <td>${r.is_active ? 'Yes' : 'No'}</td>
      <td><button class="link-btn editBtn">Edit</button> <button class="link-btn delBtn">Delete</button></td>
    </tr>
  `
});
