const btn = document.getElementById('download')
const codeInput = document.getElementById('code')
const error = document.getElementById('error')
const label = 'Download lab repo'

btn.textContent = label

codeInput.addEventListener('keydown', e => e.key === 'Enter' && btn.click())

const setRunning = running => {
  btn.disabled = running
  codeInput.disabled = running
}

btn.addEventListener('click', async () => {
  const code = document.getElementById('code').value.trim()
  if (!code) return
  error.textContent = ''
  btn.textContent = 'Checking code…'
  setRunning(true)

  await new Promise(r => setTimeout(r, 2000))

  if (code === 'test') {
    btn.textContent = 'Downloading repo…'
    await new Promise(r => setTimeout(r, 2000))
    // window.location.href = 'DOWNLOAD_URL'
  } else {
    try {
      const res = await fetch('CLOUD_FUNCTION_URL', {
        body: JSON.stringify({ code }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const { url, message } = await res.json()
      if (url) {
        btn.textContent = 'Downloading repo…'
        await new Promise(r => setTimeout(r, 2000))
        window.location.href = url
      } else {
        error.textContent = message || 'Invalid access code.'
      }
    } catch {
      error.textContent = 'Something went wrong. Try again.'
    }
  }

  btn.textContent = label
  setRunning(false)
})
