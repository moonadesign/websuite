const g = document.getElementById.bind(document)
const modeIcons = { dark: 'fa-moon', light: 'fa-sun-bright', system: 'fa-display' }
const modes = ['system', 'light', 'dark']

const setMode = mode => {
  if (mode === 'system') document.documentElement.removeAttribute('data-theme')
  else document.documentElement.setAttribute('data-theme', mode)
  localStorage.theme = mode
  document.querySelectorAll('[data-mode-icon]').forEach(el => {
    el.className = `fa-solid ${modeIcons[mode]}`
  })
  document.querySelectorAll('[data-mode]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode)
  })
}

setMode(localStorage.theme || 'system')

document.addEventListener('click', e => {
  const btn = e.target.closest('#mode')
  if (!btn) return
  const isDark =
    document.documentElement.getAttribute('data-theme') === 'dark' ||
    (!document.documentElement.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches)
  setMode(isDark ? 'light' : 'dark')
})

document.addEventListener('click', e => {
  const btn = e.target.closest('[data-mode]')
  if (!btn) return
  setMode(btn.dataset.mode)
})
