const check = '<i class="fa-regular fa-check"></i>'
const circles = { baseui: 'fa-circle-b', radix: 'fa-circle-r', shadcn: 'fa-circle-s', themes: 'fa-circle-t' }
const s = key => c =>
  c.sources.includes(key)
    ? c.sources.length === 1
      ? `<i class="fa-regular ${circles[key]}"${c.note ? ` title="${c.note}"` : ''}></i>`
      : check
    : ''

fetch('inventory.json')
  .then(r => r.json())
  .then(data => {
    document.querySelector('#inventory tbody').innerHTML = data
      .map(
        c => `<tr${c.mvp && !c.minterface ? ' class="mvp"' : ''}>
          <td>${c.name}</td>
          <td>${s('baseui')(c)}</td>
          <td>${s('radix')(c)}</td>
          <td>${s('themes')(c)}</td>
          <td>${s('shadcn')(c)}</td>
          <td>${c.mvp ? check : ''}</td>
          <td>${c.minterface ? check : ''}</td>
        </tr>`,
      )
      .join('')
  })
