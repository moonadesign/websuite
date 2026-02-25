// Toggle: dark/light only
g('mode-toggle')?.addEventListener('click', () => {
  const isDark =
    document.documentElement.getAttribute('data-theme') === 'dark' ||
    (!document.documentElement.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches)
  setMode(isDark ? 'light' : 'dark')
})

// Cycle: system → light → dark
g('mode-cycle')?.addEventListener('click', () => {
  const current = localStorage.theme || 'system'
  setMode(modes[(modes.indexOf(current) + 1) % modes.length])
})

// Button group
document
  .querySelectorAll('.button-group [data-mode]')
  .forEach(btn => btn.addEventListener('click', () => setMode(btn.dataset.mode)))

// Select menu
g('mode-select-trigger')?.addEventListener('click', () =>
  document.querySelector('.mode-menu')?.classList.toggle('open'),
)

document.querySelectorAll('.mode-menu [data-mode]').forEach(btn =>
  btn.addEventListener('click', () => {
    setMode(btn.dataset.mode)
    document.querySelector('.mode-menu')?.classList.remove('open')
  }),
)

document.addEventListener('click', e => {
  if (!e.target.closest('.mode-select')) document.querySelector('.mode-menu')?.classList.remove('open')
})

// Glass: background image/video, only in dark mode
const glassIcons = { image: 'fa-image', off: 'fa-xmark', video: 'fa-video' }
const isDark = () =>
  document.documentElement.getAttribute('data-theme') === 'dark' ||
  (!document.documentElement.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches)

const glassModes = ['off', 'image', 'video']
const glassVideo = g('glass-video')

const currentGlass = () => glassModes.find(m => m !== 'off' && document.body.classList.contains(`glass-${m}`)) || 'off'

const setGlass = value => {
  document.body.classList.remove('glass-image', 'glass-video')
  if (value !== 'off') document.body.classList.add(`glass-${value}`)
  document.querySelectorAll('[data-glass]').forEach(btn => btn.classList.toggle('active', btn.dataset.glass === value))
  document.querySelectorAll('[data-glass-icon]').forEach(el => (el.className = `fa-solid ${glassIcons[value]}`))
  if (value === 'video') glassVideo?.play()
  else glassVideo?.pause()
}

const syncGlass = () => {
  const dark = isDark()
  document
    .querySelectorAll('[data-glass], #glass-toggle, #glass-cycle, #glass-select-trigger')
    .forEach(btn => (btn.disabled = !dark))
  if (!dark) setGlass('off')
}

g('glass-toggle')?.addEventListener('click', () => {
  setGlass(document.body.classList.contains('glass-image') ? 'off' : 'image')
})

g('glass-cycle')?.addEventListener('click', () => {
  setGlass(glassModes[(glassModes.indexOf(currentGlass()) + 1) % glassModes.length])
})

document
  .querySelectorAll('#glass-group [data-glass]')
  .forEach(btn => btn.addEventListener('click', () => setGlass(btn.dataset.glass)))

g('glass-select-trigger')?.addEventListener('click', () =>
  document.querySelector('.glass-menu')?.classList.toggle('open'),
)

document.querySelectorAll('.glass-menu [data-glass]').forEach(btn =>
  btn.addEventListener('click', () => {
    setGlass(btn.dataset.glass)
    document.querySelector('.glass-menu')?.classList.remove('open')
  }),
)

document.addEventListener('click', e => {
  if (!e.target.closest('.glass-select')) document.querySelector('.glass-menu')?.classList.remove('open')
})

new MutationObserver(syncGlass).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', syncGlass)
syncGlass()
