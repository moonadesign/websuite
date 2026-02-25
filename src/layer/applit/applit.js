const applit = document.querySelector('.applit')

if (applit) {
  const buttons = [...applit.querySelectorAll('[data-frame]')]
  const browser = applit.querySelector('.browser')
  const macApp = applit.querySelector('.mac-app')
  const setSidebar = button => {
    const frame = button.closest('.mac-app')
    if (!frame) return
    frame.classList.toggle('mac-app-collapsed')
    button.setAttribute('aria-expanded', String(!frame.classList.contains('mac-app-collapsed')))
  }
  const setFrame = frame => {
    if (!browser || !macApp) return
    if (frame !== 'browser' && frame !== 'mac-app') return
    buttons.forEach(button => {
      const active = button.dataset.frame === frame
      button.classList.toggle('button-outline', !active)
      button.classList.toggle('button-primary', active)
    })
    browser.hidden = frame !== 'browser'
    macApp.hidden = frame !== 'mac-app'
  }

  applit.addEventListener('click', event => {
    const frameButton = event.target.closest('[data-frame]')
    if (frameButton) return setFrame(frameButton.dataset.frame)
    const sidebarButton = event.target.closest('[data-sidebar-toggle]')
    if (sidebarButton) setSidebar(sidebarButton)
  })
  setFrame('browser')
}
