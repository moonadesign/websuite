const make = (tag, className, text) => {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text) node.textContent = text
  return node
}

fetch('projects.json')
  .then(res => res.json())
  .then(projects => {
    const grid = document.getElementById('project-grid')
    if (!grid) return
    projects.forEach(p => {
      const card = make('a', 'project-card')
      const image = make('div', 'project-image')
      const imageMedia = make('img', 'project-image-media')
      const about = make('p', 'project-about', p.description)
      const title = make('div', 'project-title')
      const titleText = make('h3', '', p.title)
      const titleUrl = make('span', 'project-url')
      const url = new URL(p.link, window.location.origin)
      const isLocal = p.link.startsWith('/')

      card.href = p.link
      if (!isLocal) {
        card.rel = 'noreferrer'
        card.target = '_blank'
      }

      imageMedia.alt = p.title
      imageMedia.src = p.image.replace('/upload/', '/upload/q_auto/')
      titleUrl.textContent = url.hostname + (url.pathname === '/' ? '' : url.pathname)

      image.appendChild(imageMedia)
      image.appendChild(about)
      title.appendChild(titleText)
      title.appendChild(titleUrl)
      card.appendChild(image)
      card.appendChild(title)
      grid.appendChild(card)
    })
  })
