const btn = g('download')
const codeInput = g('code')
const error = g('error')
const label = 'Download lab repo'

btn.textContent = label

codeInput.addEventListener('keydown', e => e.key === 'Enter' && btn.click())

const setRunning = running => {
  btn.disabled = running
  codeInput.disabled = running
}

btn.addEventListener('click', async () => {
  const code = codeInput.value.trim()
  if (!code) return
  error.textContent = ''
  btn.textContent = 'Checking code…'
  setRunning(true)

  try {
    const res = await fetch('https://us-central1-samantha-374622.cloudfunctions.net/revalize', {
      body: JSON.stringify({ password: code, version: '0.26.2.200' }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
    if (res.ok) {
      const { url } = await res.json()
      btn.textContent = 'Downloading repo…'
      await new Promise(r => setTimeout(r, 2000))
      window.location.href = url
    } else {
      error.textContent = 'Invalid access code.'
    }
  } catch {
    error.textContent = 'Something went wrong. Try again.'
  }

  btn.textContent = label
  setRunning(false)
})
