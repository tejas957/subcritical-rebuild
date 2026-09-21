// Careers page: live text search + department filter over the static role list.

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('roleSearch');
  const chips = document.querySelectorAll('.dept-chip');
  const rows = document.querySelectorAll('.role-row');
  const noResults = document.getElementById('noResults');
  let activeDept = 'all';

  function applyFilters() {
    const term = (searchInput.value || '').trim().toLowerCase();
    let visibleCount = 0;

    rows.forEach((row) => {
      const title = (row.getAttribute('data-title') || '').toLowerCase();
      const dept = row.getAttribute('data-dept') || '';
      const matchesTerm = term === '' || title.includes(term) || dept.toLowerCase().includes(term);
      const matchesDept = activeDept === 'all' || dept === activeDept;
      const visible = matchesTerm && matchesDept;
      row.classList.toggle('is-hidden', !visible);
      if (visible) visibleCount++;
    });

    if (noResults) noResults.classList.toggle('is-visible', visibleCount === 0);
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      activeDept = chip.getAttribute('data-dept');
      applyFilters();
    });
  });
});
