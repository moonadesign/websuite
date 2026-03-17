q('.brandon-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    q('.brandon-tab').forEach(t => t.classList.remove('active'))
    tab.classList.add('active')
    const view = tab.dataset.view
    q('.brandon-view').forEach(v => v.classList.toggle('hidden', v.id !== `brandon-${view}`))
  })
})
