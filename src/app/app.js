q('[data-page]').forEach(btn =>
  btn.addEventListener('click', () => {
    q('[data-page]').forEach(b => b.classList.remove('active'))
    q('.page').forEach(p => p.classList.remove('active'))
    btn.classList.add('active')
    g(btn.dataset.page)?.classList.add('active')
  }),
)

g('sidebar-toggle')?.addEventListener('click', () => g('side').classList.toggle('collapsed'))
