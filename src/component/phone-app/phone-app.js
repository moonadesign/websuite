const sizeButtons = document.querySelectorAll('#phone-sizes [data-phone-size]')
const callTimers = document.querySelectorAll('[data-call-timer]')
const timeElements = document.querySelectorAll('[data-clock]')

if (sizeButtons.length) {
  // Size decisions:
  // - Removed iPhone 4 (20remx30rem) and iPhone 6 (24remx40rem): pre-edge-to-edge home-button era looked incorrect.
  // - Kept active presets: iPhone 5 (20remx35rem), iPhone X (24remx48rem), iPhone 12 (24remx52rem), iPhone Plus (25remx56rem).
  const setPhoneSize = value => {
    const [width, height] = value.split('x')
    if (!width || !height) return
    document.body?.classList.toggle('iphone-plus', value === '25remx56rem')
    document.documentElement.style.setProperty('--phone-height', height)
    document.documentElement.style.setProperty('--phone-width', width)
    sizeButtons.forEach(button => button.classList.toggle('active', button.dataset.phoneSize === value))
  }

  sizeButtons.forEach(button => button.addEventListener('click', () => setPhoneSize(button.dataset.phoneSize)))
  setPhoneSize('24remx48rem')
}

if (timeElements.length) {
  const setTime = () => {
    const now = new Date()
    const hours = now.getHours() % 12 || 12
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const time = `${hours}:${minutes}`
    timeElements.forEach(element => (element.textContent = time))
  }

  setTime()
  setInterval(setTime, 30000)
}

if (callTimers.length) {
  const startedAt = Date.now()
  const setCallTimer = () => {
    const elapsed = Math.floor((Date.now() - startedAt) / 1000)
    const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0')
    const seconds = String(elapsed % 60).padStart(2, '0')
    const time = `${minutes}:${seconds}`
    callTimers.forEach(callTimer => (callTimer.textContent = time))
  }

  setCallTimer()
  setInterval(setCallTimer, 1000)
}
