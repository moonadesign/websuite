fetch('content.json')
  .then(r => r.json())
  .then(items => {
    const filters = document.getElementById('filters')
    const grid = document.getElementById('grid')
    const types = ['page', 'layer', 'component']

    const render = filter => {
      grid.innerHTML = items
        .filter(i => i.type === filter && !i.hide)
        .map(i => {
          const tag = i.route ? 'a' : 'div'
          const href = i.route ? ` href="${i.route}"` : ''
          return `<${tag}${href} class="item">
            <div class="thumb"${i.thumb ? ` style="--thumb:${i.thumb}"` : ''}></div>
            <strong>${i.name}</strong>
          </${tag}>`
        })
        .join('')
    }

    filters.innerHTML = types
      .map(
        (t, i) =>
          `<a href="#" class="${i === 0 ? 'active' : ''}" data-filter="${t}">${t[0].toUpperCase() + t.slice(1)}s</a>`,
      )
      .join('')

    filters.addEventListener('click', e => {
      e.preventDefault()
      const link = e.target.closest('a')
      if (!link) return
      filters.querySelectorAll('a').forEach(a => a.classList.remove('active'))
      link.classList.add('active')
      render(link.dataset.filter)
    })

    render('page')
  })
