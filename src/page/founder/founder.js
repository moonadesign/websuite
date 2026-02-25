fetch('projects.json')
  .then(res => res.json())
  .then(projects => {
    const container = document.querySelector('#projects-list')
    if (container) {
      container.innerHTML = projects
        .map(p => {
          const [year, month] = p.date.split('-')
          const date = new Date(year, month - 1)
          const formattedDate = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          return `
        <div class="project">
          <div class="project-text">
            <div class="project-text-top">
              <h3>${p.title}</h3>
              ${p.subtitle ? `<div class="project-subtitle">${p.subtitle}</div>` : ''}
              ${p.tags ? `<div class="project-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>` : ''}
              <div class="project-date">${formattedDate}</div>
            </div>
            <a class="project-url" href="${p.link}" target="_blank">${new URL(p.link).hostname.replace('www.', '')}</a>
          </div>
          <a class="project-image" href="${p.link}" target="_blank">
            <img alt="${p.title}" src="${p.image.replace('/upload/', '/upload/q_auto/')}">
          </a>
        </div>
      `
        })
        .join('')
    }
  })
