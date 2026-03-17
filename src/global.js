const g = document.getElementById.bind(document)
const q = document.querySelectorAll.bind(document)

document.addEventListener('click', e => {
  const s = e.target.closest('.switch:not([disabled])')
  if (s) s.setAttribute('aria-checked', s.getAttribute('aria-checked') === 'true' ? 'false' : 'true')
})

const updateFill = r => r.style.setProperty('--fill', `${((r.value - r.min) / (r.max - r.min)) * 100}%`)
q('input[type="range"]').forEach(r => {
  updateFill(r)
  r.addEventListener('input', () => updateFill(r))
})

document.addEventListener('input', e => {
  if (e.target.matches('.otp-group input') && e.target.value) e.target.nextElementSibling?.focus()
})
document.addEventListener('keydown', e => {
  if (e.target.matches('.otp-group input') && e.key === 'Backspace' && !e.target.value)
    e.target.previousElementSibling?.focus()
})
