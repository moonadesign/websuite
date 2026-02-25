document.querySelectorAll('.brandon-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.brandon-tab').forEach(t => t.classList.remove('active'))
    tab.classList.add('active')
    const view = tab.dataset.view
    document.querySelectorAll('.brandon-view').forEach(v => v.classList.toggle('hidden', v.id !== `brandon-${view}`))
  })
})
