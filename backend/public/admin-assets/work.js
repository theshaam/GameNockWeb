initCrud({
  apiBase: '/api/admin/work',
  colspan: 6,
  rowHtml: (r) => `
    <tr data-id="${r.id}">
      <td>${r.sort_order}</td>
      <td>${esc(r.title)}</td>
      <td>${esc(r.slug)}</td>
      <td>${esc(r.category)}</td>
      <td>${r.is_active ? 'Yes' : 'No'}</td>
      <td><button class="link-btn editBtn">Edit</button> <button class="link-btn delBtn">Delete</button></td>
    </tr>
  `
});
