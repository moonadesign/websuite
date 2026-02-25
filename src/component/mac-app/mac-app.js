const macApp = document.querySelector('.mac-app')
const toggle = document.querySelector('[data-sidebar-toggle]')

if (macApp && toggle) {
  const setExpanded = () =>
    toggle.setAttribute('aria-expanded', String(!macApp.classList.contains('mac-app-collapsed')))
  setExpanded()
  toggle.addEventListener('click', () => {
    macApp.classList.toggle('mac-app-collapsed')
    setExpanded()
  })
}
