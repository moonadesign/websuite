// Presets
const presets = {
  Shell: [
    { heading: 'Navigation' },
    { icon: 'fa-table-layout', label: 'Dashboard', active: true },
    { icon: 'fa-cog', label: 'Settings' },
    { heading: 'Resources' },
    { icon: 'fa-circle-question', label: 'Help center' },
    { icon: 'fa-ticket', label: 'Support tickets' },
    { icon: 'fa-clock-rotate-left', label: 'Changelog' },
    { slot: 'corner', icon: 'fa-search' },
    { slot: 'corner', icon: 'fa-bell' },
    { slot: 'corner', icon: 'fa-cog' },
    { slot: 'footer', label: 'Privacy', href: '/privacy', variant: 'link' },
    { slot: 'footer', label: 'Terms', href: '/terms', variant: 'link' },
    { slot: 'footer', label: 'support@acme.com', href: 'mailto:support@acme.com', variant: 'link' },
    { slot: 'footer-end', label: 'Chat with support', variant: 'link' },
  ],
  Flux: [
    { heading: 'Workspace' },
    { icon: 'fa-table-layout', label: 'Dashboard', active: true },
    { icon: 'fa-cube', label: 'Products' },
    { icon: 'fa-gear-complex', label: 'Configurations' },
    { icon: 'fa-box', label: 'Orders' },
    { icon: 'fa-file-invoice-dollar', label: 'Quotes' },
    { icon: 'fa-circle-check', label: 'Approvals' },
    { icon: 'fa-chart-line', label: 'Analytics' },
    { heading: 'Administration' },
    { icon: 'fa-shapes', label: 'Product Types' },
    { icon: 'fa-tag', label: 'Pricing' },
    { icon: 'fa-id-card', label: 'Dealer Access' },
    { icon: 'fa-building', label: 'Accounts' },
    { icon: 'fa-pen-ruler', label: 'Model Editor' },
    { icon: 'fa-book', label: 'Pricebooks' },
    { icon: 'fa-shield-check', label: 'Approval Policies' },
    { icon: 'fa-brain-circuit', label: 'Document Intelligence' },
    { icon: 'fa-diagram-project', label: 'Spec to Config' },
    { icon: 'fa-comment-quote', label: 'RFP to Quote' },
    { icon: 'fa-users', label: 'Rep Management' },
    { heading: 'Account' },
    { icon: 'fa-circle-user', label: 'My Profile' },
    { icon: 'fa-cog', label: 'Settings' },
    { icon: 'fa-circle-info', label: 'About' },
  ],
  Demo: [
    { icon: 'fa-table-layout', label: 'Dashboard', active: true },
    { icon: 'fa-cube', label: 'Products' },
    { icon: 'fa-database', label: 'Library' },
    { icon: 'fa-arrow-progress', label: 'Workflows' },
    { icon: 'fa-chart-line', label: 'Reports' },
    { icon: 'fa-cog', label: 'Settings' },
    { icon: 'fa-play', label: 'Preview' },
    { slot: 'corner', icon: 'fa-search' },
    { slot: 'corner', icon: 'fa-bell' },
    { slot: 'corner', icon: 'fa-cog' },
    { slot: 'footer', label: 'Privacy', href: '/privacy', variant: 'link' },
    { slot: 'footer', label: 'Terms', href: '/terms', variant: 'link' },
    { slot: 'footer', label: 'support@acme.com', href: 'mailto:support@acme.com', variant: 'link' },
    { slot: 'footer', icon: 'fa-globe', label: 'English' },
    { slot: 'footer-end', label: 'Chat with support', variant: 'link' },
  ],
}

// State
const state = {
  nav: presets.Shell,
  orientation: 'horizontal',
  navStyle: 'light',
}

// Helpers
const CAP = 4
const navKey = { footer: 'foot', 'footer-end': 'foot-corner' }

const makeNavBtn = item => {
  const btn = document.createElement('button')
  btn.className = item.active ? 'button active' : 'button'
  const i = document.createElement('i')
  i.className = `fa-regular ${item.icon}`
  const span = document.createElement('span')
  span.textContent = item.label
  btn.appendChild(i)
  btn.appendChild(span)
  btn.addEventListener('click', () => {
    state.nav = state.nav.map(n => ((n.slot ?? 'main') === 'main' && !n.heading ? { ...n, active: n === item } : n))
    hydrate()
    updateJsonEditor()
  })
  return btn
}

const makeMenuItem = item => {
  const btn = document.createElement('button')
  btn.className = 'menu-item'
  const i = document.createElement('i')
  i.className = `fa-regular ${item.icon}`
  btn.appendChild(i)
  btn.appendChild(document.createTextNode(item.label))
  return btn
}

const makeItem = item => {
  const slot = item.slot ?? 'main'
  if (slot === 'main') {
    if (item.heading) {
      const div = document.createElement('div')
      div.className = 'cpq-nav-heading small-caps'
      div.textContent = item.heading
      return div
    }
    return makeNavBtn(item)
  }
  if (slot === 'corner') {
    const btn = document.createElement('button')
    btn.className = 'button button-icon'
    const i = document.createElement('i')
    i.className = `fa-regular ${item.icon}`
    btn.appendChild(i)
    return btn
  }
  const el = item.href ? document.createElement('a') : document.createElement('button')
  if (item.href) el.href = item.href
  el.className = `button${item.variant ? ` button-${item.variant}` : ''}`
  if (item.icon) {
    const i = document.createElement('i')
    i.className = `fa-regular ${item.icon}`
    el.appendChild(i)
  }
  el.appendChild(document.createTextNode(item.label))
  return el
}

// Hydrate
const hydrate = () => {
  ;['as', 'ns'].forEach(p => {
    const el = g(p)
    el.querySelectorAll('[data-nav]').forEach(c => c.replaceChildren())
    const mainBtns = []
    state.nav.forEach(item => {
      const slot = item.slot ?? 'main'
      if (slot === 'main') {
        el.querySelector('[data-nav="nav-items"]').appendChild(makeItem(item))
        if (!item.heading) mainBtns.push(item)
      } else {
        el.querySelectorAll(`[data-nav="${navKey[slot] ?? slot}"]`).forEach(c => c.appendChild(makeItem(item)))
      }
    })
    mainBtns.slice(0, CAP).forEach(item => el.querySelector('[data-nav="topbar-items"]').appendChild(makeNavBtn(item)))
    const overflow = mainBtns.slice(CAP)
    g(`${p}-more-btn`).hidden = !overflow.length
    const moreMenu = g(`${p}-topbar-more`)
    moreMenu.replaceChildren()
    overflow.forEach(item => moreMenu.appendChild(makeMenuItem(item)))
  })
}

const updateJsonEditor = () => {
  g('ns-json').value = '[\n' + state.nav.map(item => '  ' + JSON.stringify(item)).join(',\n') + '\n]'
}

const render = () => {
  const vertical = state.orientation === 'vertical'
  ;['as', 'ns'].forEach(p => {
    g(`${p}-topbar`).hidden = !vertical
    g(`${p}-nav`).hidden = vertical
    g(`${p}-toolbar`).hidden = vertical
    g(`${p}-nav`).classList.toggle('glass', state.navStyle === 'inverted')
  })
  hydrate()
  updateJsonEditor()
}

// Bindings
q('[data-preset]').forEach(btn =>
  btn.addEventListener('click', () => {
    state.nav = presets[btn.dataset.preset]
    render()
  }),
)
q('[name="ns-nav-orientation"]').forEach(el =>
  el.addEventListener('change', () => {
    state.orientation = el.value
    render()
  }),
)
q('[name="ns-nav-style"]').forEach(el =>
  el.addEventListener('change', () => {
    state.navStyle = el.value
    render()
  }),
)
q('.cpq-nav-user').forEach(el =>
  el.addEventListener('click', () => {
    const menu = el.querySelector('[popover]')
    menu?.togglePopover()
  }),
)
g('ns-json').addEventListener('change', e => {
  try {
    state.nav = JSON.parse(e.target.value)
    render()
  } catch {}
})

// Tokens
const buildTokens = tokens => {
  const grid = g('tokens-grid')
  const groups = {}
  tokens.forEach(t => {
    ;(groups[t.category] ??= []).push(t)
  })
  Object.entries(groups).forEach(([category, rows]) => {
    const details = document.createElement('details')
    details.open = true
    const summary = document.createElement('summary')
    summary.textContent = category
    details.appendChild(summary)
    const table = document.createElement('table')
    rows.forEach(({ token, value }) => {
      const tr = document.createElement('tr')
      const td1 = document.createElement('td')
      td1.textContent = token
      const td2 = document.createElement('td')
      td2.textContent = value
      tr.appendChild(td1)
      tr.appendChild(td2)
      table.appendChild(tr)
    })
    details.appendChild(table)
    grid.appendChild(details)
  })
}

fetch('tokens.json')
  .then(r => r.json())
  .then(buildTokens)

render()
