const macApp = document.querySelector('#applit .mac-app')
const toggle = document.querySelector('#applit [data-sidebar-toggle]')

if (macApp && toggle) {
  const setExpanded = () =>
    toggle.setAttribute('aria-expanded', String(!macApp.classList.contains('mac-app-collapsed')))
  setExpanded()
  toggle.addEventListener('click', () => {
    macApp.classList.toggle('mac-app-collapsed')
    setExpanded()
  })
}
