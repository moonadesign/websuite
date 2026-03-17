const timeElements = q('[data-clock]')
const callTimers = q('[data-call-timer]')

if (timeElements.length) {
  const setTime = () => {
    const now = new Date()
    const h = now.getHours() % 12 || 12
    const m = String(now.getMinutes()).padStart(2, '0')
    timeElements.forEach(el => (el.textContent = `${h}:${m}`))
  }
  setTime()
  setInterval(setTime, 30000)
}

if (callTimers.length) {
  const start = Date.now()
  const tick = () => {
    const s = Math.floor((Date.now() - start) / 1000)
    const time = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
    callTimers.forEach(el => (el.textContent = time))
  }
  tick()
  setInterval(tick, 1000)
}
