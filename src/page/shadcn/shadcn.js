/* Compact */
g('compact-toggle').addEventListener('click', () => document.body.classList.toggle('compact'))

/* Audit */
const examples = ['ex', 'mail', 'dashboard', 'cards', 'tasks', 'playground', 'forms', 'music', 'authentication']
Promise.all([
  fetch('../../page/inventory/inventory.json').then(r => r.json()),
  fetch('audit.json').then(r => r.json()),
]).then(([inventory, audit]) => {
  g('audit-body').innerHTML = inventory
    .map(c => {
      const coverage = audit[c.name] || []
      const cells = examples.map(e => `<td>${coverage.includes(e) ? 'x' : ''}</td>`).join('')
      return `<tr><td>${c.name}</td>${cells}<td class="muted">${c.minterface ? '✓' : c.note || ''}</td></tr>`
    })
    .join('')
})

/* Tabs */
q('#example-tabs button').forEach(tab =>
  tab.addEventListener('click', () => {
    q('#example-tabs button').forEach(t => t.classList.remove('active'))
    q('.tab-panel').forEach(p => p.classList.remove('active'))
    tab.classList.add('active')
    document.querySelector(`[data-panel="${tab.dataset.tab}"]`)?.classList.add('active')
  }),
)

/* Toggle */
q('.toggle').forEach(btn =>
  btn.addEventListener('click', () => {
    const pressed = btn.getAttribute('aria-pressed') !== 'true'
    btn.setAttribute('aria-pressed', String(pressed))
  }),
)

/* Accordion */
q('.nav-section-header').forEach(header =>
  header.addEventListener('click', () => header.parentElement.classList.toggle('collapsed')),
)

/* Dialog / Sheet / Drawer */
q('[data-open]').forEach(btn => btn.addEventListener('click', () => g(btn.dataset.open)?.showModal()))
q('[data-close]').forEach(btn => btn.addEventListener('click', () => g(btn.dataset.close)?.close()))
q('dialog').forEach(d =>
  d.addEventListener('click', e => {
    if (e.target === d) d.close()
  }),
)

/* Dropdown */
q('.dropdown-trigger').forEach(trigger =>
  trigger.addEventListener('click', e => {
    e.stopPropagation()
    trigger.closest('.dropdown').classList.toggle('open')
  }),
)
document.addEventListener('click', () => q('.dropdown.open').forEach(d => d.classList.remove('open')))

/* Toast */
g('toast-trigger')?.addEventListener('click', () => {
  const toast = document.createElement('div')
  toast.className = 'toast'
  toast.textContent = 'Event has been created.'
  g('toast-container').appendChild(toast)
  setTimeout(() => toast.remove(), 3000)
})

/* Carousel */
q('.carousel').forEach(c => {
  const track = c.querySelector('.carousel-track')
  c.querySelector('.carousel-prev')?.addEventListener('click', () =>
    track.scrollBy({ left: -track.offsetWidth, behavior: 'smooth' }),
  )
  c.querySelector('.carousel-next')?.addEventListener('click', () =>
    track.scrollBy({ left: track.offsetWidth, behavior: 'smooth' }),
  )
})
