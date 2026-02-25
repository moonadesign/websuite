document.querySelectorAll('#example-tabs .tab').forEach(tab =>
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'))
    tab.classList.add('active')
    document.querySelector(`[data-panel="${tab.dataset.tab}"]`)?.classList.add('active')
  }),
)
