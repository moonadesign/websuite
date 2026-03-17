q('.tab-bar').forEach(bar =>
  bar.addEventListener('click', e => {
    const tab = e.target.closest('.tab')
    if (!tab) return
    bar.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
    tab.classList.add('active')
  }),
)

q('.button-group').forEach(g =>
  g.addEventListener('click', e => {
    const b = e.target.closest('.button')
    if (!b) return
    g.querySelectorAll('.button').forEach(x => x.classList.remove('active'))
    b.classList.add('active')
  }),
)

q('.toggle[aria-pressed]').forEach(b =>
  b.addEventListener('click', () => {
    const pressed = b.getAttribute('aria-pressed') !== 'true'
    b.setAttribute('aria-pressed', String(pressed))
    const i = b.querySelector('i')
    if (i?.classList.contains('fa-heart')) i.className = pressed ? 'fa-solid fa-heart' : 'fa-regular fa-heart'
  }),
)
