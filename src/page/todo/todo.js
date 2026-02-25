fetch('todo.json')
  .then(r => r.json())
  .then(data => {
    const kanban = document.querySelector('#kanban')
    const cols = [
      { label: 'Later', filter: t => t.when === 'later' },
      { label: 'Next', filter: t => t.when === 'next' },
      { label: 'Now', filter: t => t.when === 'now' },
      { label: 'Done', filter: t => ['deconstruct', 'extend', 'past'].includes(t.when) },
    ]

    const makeItem = t => {
      const row = document.createElement('div')
      row.className = 'todo-item'

      const header = document.createElement('div')
      header.className = 'item-header'

      const name = document.createElement('strong')
      if (t.route) {
        const link = document.createElement('a')
        link.href = t.route
        link.textContent = t.name
        name.appendChild(link)
      } else {
        name.textContent = t.name
      }
      header.appendChild(name)

      if (t.type) {
        const type = document.createElement('span')
        type.className = 'type'
        type.textContent = t.type
        header.appendChild(type)
      }

      if (t.week) {
        const week = document.createElement('span')
        week.className = 'week'
        week.textContent = t.week
        header.appendChild(week)
      }

      row.appendChild(header)

      if (t.note) {
        const note = document.createElement('p')
        note.textContent = t.note
        row.appendChild(note)
      }

      if (t.items) {
        const items = document.createElement('p')
        items.textContent = t.items.join(', ')
        row.appendChild(items)
      }

      if (t.sponsors || t.sponsored_by) {
        const p = document.createElement('p')
        p.className = 'sponsors'
        const parts = []
        if (t.sponsors) parts.push('sponsors ' + t.sponsors.join(', '))
        if (t.sponsored_by) parts.push('sponsored by ' + t.sponsored_by.join(', '))
        p.textContent = parts.join(' · ')
        row.appendChild(p)
      }

      return row
    }

    cols.forEach(({ label, filter }) => {
      const col = document.createElement('div')
      col.className = 'kanban-col'

      const h3 = document.createElement('h3')
      h3.textContent = label
      col.appendChild(h3)

      data.filter(filter).forEach(t => col.appendChild(makeItem(t)))
      kanban.appendChild(col)
    })
  })
