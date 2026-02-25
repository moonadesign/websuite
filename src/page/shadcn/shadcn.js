/* Audit */
const examples = ['ex', 'mail', 'dashboard', 'cards', 'tasks', 'playground', 'forms', 'music', 'authentication']
Promise.all([
  fetch('../../page/inventory/inventory.json').then(r => r.json()),
  fetch('audit.json').then(r => r.json()),
]).then(([inventory, audit]) => {
  document.getElementById('audit-body').innerHTML = inventory
    .map(c => {
      const coverage = audit[c.name] || []
      const cells = examples.map(e => `<td>${coverage.includes(e) ? 'x' : ''}</td>`).join('')
      return `<tr><td>${c.name}</td>${cells}<td class="muted">${c.minterface_class}</td></tr>`
    })
    .join('')
})

/* Tabs */
document.querySelectorAll('#example-tabs .tab').forEach(tab =>
  tab.addEventListener('click', () => {
    document.querySelectorAll('#example-tabs .tab').forEach(t => t.classList.remove('active'))
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'))
    tab.classList.add('active')
    document.querySelector(`[data-panel="${tab.dataset.tab}"]`)?.classList.add('active')
  }),
)

/* Switch */
document
  .querySelectorAll('.switch')
  .forEach(sw =>
    sw.addEventListener('click', () =>
      sw.setAttribute('aria-checked', String(sw.getAttribute('aria-checked') !== 'true')),
    ),
  )

/* Toggle */
document.querySelectorAll('.toggle').forEach(btn =>
  btn.addEventListener('click', () => {
    if (btn.closest('.toggle-group')) {
      btn
        .closest('.toggle-group')
        .querySelectorAll('.toggle')
        .forEach(t => t.classList.remove('active'))
      btn.classList.add('active')
    } else {
      btn.classList.toggle('active')
      btn.setAttribute('aria-pressed', String(btn.classList.contains('active')))
    }
  }),
)

/* Accordion */
document
  .querySelectorAll('.nav-section-header')
  .forEach(header => header.addEventListener('click', () => header.parentElement.classList.toggle('collapsed')))

/* Dialog / Sheet / Drawer */
document
  .querySelectorAll('[data-open]')
  .forEach(btn => btn.addEventListener('click', () => document.getElementById(btn.dataset.open)?.showModal()))
document
  .querySelectorAll('[data-close]')
  .forEach(btn => btn.addEventListener('click', () => document.getElementById(btn.dataset.close)?.close()))
document.querySelectorAll('dialog').forEach(d =>
  d.addEventListener('click', e => {
    if (e.target === d) d.close()
  }),
)

/* Dropdown */
document.querySelectorAll('.dropdown-trigger').forEach(trigger =>
  trigger.addEventListener('click', e => {
    e.stopPropagation()
    trigger.closest('.dropdown').classList.toggle('open')
  }),
)
document.addEventListener('click', () =>
  document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open')),
)

/* Toast */
document.getElementById('toast-trigger')?.addEventListener('click', () => {
  const toast = document.createElement('div')
  toast.className = 'toast'
  toast.textContent = 'Event has been created.'
  document.getElementById('toast-container').appendChild(toast)
  setTimeout(() => toast.remove(), 3000)
})

/* Carousel */
document.querySelectorAll('.carousel').forEach(c => {
  const track = c.querySelector('.carousel-track')
  c.querySelector('.carousel-prev')?.addEventListener('click', () =>
    track.scrollBy({ left: -track.offsetWidth, behavior: 'smooth' }),
  )
  c.querySelector('.carousel-next')?.addEventListener('click', () =>
    track.scrollBy({ left: track.offsetWidth, behavior: 'smooth' }),
  )
})
