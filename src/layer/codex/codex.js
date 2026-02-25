const codex = document.querySelector('.mac-app')
const toggle = document.querySelector('[data-sidebar-toggle]')

if (codex && toggle) {
  const setExpanded = () => toggle.setAttribute('aria-expanded', String(!codex.classList.contains('mac-app-collapsed')))
  setExpanded()
  toggle.addEventListener('click', () => {
    codex.classList.toggle('mac-app-collapsed')
    setExpanded()
  })
}
