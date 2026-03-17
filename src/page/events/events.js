const make = (tag, className, text) => {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text) node.textContent = text
  return node
}

const day = document.querySelector('#events-day')
const header = document.querySelector('#events-header')
const quote = document.querySelector('#quote')
const quoteAuthor = document.querySelector('#quote-author')
const quoteText = document.querySelector('#quote-text')
const view = document.querySelector('#events-view')
let dayIndex = 0
let days = []
let quotes = []
let viewMode = 'editorial'

const makeFutureCard = item => {
  const article = make('article', 'card future-card')
  const date = make('div', 'future-date')
  const body = make('div', 'stack')
  if (item.month) date.appendChild(make('small', 'small-caps', item.month))
  date.appendChild(make('div', 'future-number', item.date))
  body.appendChild(make('strong', '', item.name))
  if (item.label) body.appendChild(make('p', '', item.label))
  article.appendChild(date)
  article.appendChild(body)
  return article
}

const makeTodayCard = item => {
  const article = make('article', 'glass')
  article.id = 'today-card'
  const bottom = make('div', 'today-bottom')
  const date = make('div', 'today-date')
  const name = make('div', 'stack')
  const top = make('div', 'today-top')
  if (item.date === '17' && item.month === 'March') {
    article.style.setProperty('--color-darkest', '#cfd')
    article.style.setProperty('--color-lightest', '#486')
  }
  top.appendChild(make('small', 'small-caps', 'Today'))
  if (item.month) date.appendChild(make('small', 'small-caps', item.month))
  date.appendChild(make('div', 'today-number', item.date))
  top.appendChild(date)
  bottom.appendChild(make('p', '', item.count || ''))
  if (item.label) name.appendChild(make('p', '', item.label))
  if (item.name) name.appendChild(make('strong', '', item.name))
  if (item.label || item.name) bottom.appendChild(name)
  article.appendChild(top)
  article.appendChild(bottom)
  return article
}

const getSections = () => days[dayIndex]?.sections || []

const makeScheduleCard = (item, showSlot = true) => {
  const article = make('article', 'card schedule-card')
  const slot = item.label || item.date
  if (showSlot && slot) article.appendChild(make('p', 'schedule-slot', slot))
  article.appendChild(make('strong', '', item.name))
  return article
}

const makeList = (items, sectionId) => {
  const list = make('div', sectionId === 'future' && viewMode === 'editorial' ? 'masonry' : 'cards')
  items.forEach(item =>
    list.appendChild(
      item.current ? makeTodayCard(item) : sectionId === 'future' ? makeFutureCard(item) : makeScheduleCard(item),
    ),
  )
  return list
}

const makeSection = section => {
  const article = make('section', 'layer')
  article.dataset.rendered = 'events'
  article.id = section.id
  const inset = make('div', 'layer-inset')
  if (section.id !== 'today') inset.appendChild(make('h2', '', section.name))
  if (section.intro) inset.appendChild(make('p', '', section.intro))
  inset.appendChild(makeList(section.items, section.id))
  article.appendChild(inset)
  return article
}

const makeTodaySection = section => {
  const article = make('section', 'layer')
  article.dataset.rendered = 'events'
  article.id = section.id
  const inset = make('div', 'layer-inset')
  const rail = make('div', 'cards')
  const count = section.items.filter(item => !item.current).length
  const current = section.items.find(item => item.current)
  if (current) inset.appendChild(makeTodayCard({ ...current, count: `${count} events` }))
  section.items.filter(item => !item.current).forEach(item => rail.appendChild(makeScheduleCard(item)))
  inset.appendChild(rail)
  article.appendChild(inset)
  return article
}

const makeWeekList = section => {
  const list = make('div', 'days')
  section.items.forEach(item => {
    const cards = make('div', 'cards')
    const day = make('div', 'day')
    const heading = make('div', 'week-heading', item.label)
    heading.appendChild(make('span', 'week-date', ` ${item.date}`))
    cards.appendChild(makeScheduleCard(item, false))
    day.appendChild(heading)
    day.appendChild(cards)
    list.appendChild(day)
  })
  return list
}

const makeWeekSection = section => {
  const article = make('section', 'layer')
  const inset = make('div', 'layer-inset')
  article.dataset.rendered = 'events'
  article.id = section.id
  inset.appendChild(make('h2', '', section.name))
  inset.appendChild(makeWeekList(section))
  article.appendChild(inset)
  return article
}

const makeColumn = section => {
  const article = make('section', 'stack')
  if (section.id !== 'today') article.appendChild(make('h2', '', section.name))
  if (section.intro) article.appendChild(make('p', '', section.intro))
  article.appendChild(section.id === 'week' ? makeWeekList(section) : makeList(section.items, section.id))
  return article
}

const makeColumns = () => {
  const article = make('section', 'layer')
  article.dataset.rendered = 'events'
  const inset = make('div', 'layer-inset')
  article.id = 'columns'
  getSections().forEach(section => inset.appendChild(makeColumn(section)))
  article.appendChild(inset)
  return article
}

const makeEditorial = () => {
  const fragment = document.createDocumentFragment()
  getSections().forEach(section =>
    fragment.appendChild(
      section.id === 'today'
        ? makeTodaySection(section)
        : section.id === 'week'
          ? makeWeekSection(section)
          : makeSection(section),
    ),
  )
  return fragment
}

const render = () => {
  q("body > [data-rendered='events']").forEach(section => section.remove())
  if (quotes.length) {
    const item = quotes[Math.floor(Math.random() * quotes.length)]
    quoteAuthor.textContent = `—${item.author}`
    quoteText.textContent = item.text
  }
  quote.after(viewMode === 'columns' ? makeColumns() : makeEditorial())
}

const setView = mode => {
  viewMode = mode
  ;[...view.querySelectorAll('.button')].forEach(button => {
    const active = button.dataset.view === mode
    button.classList.toggle('active', active)
    button.classList.toggle('button-outline', !active)
    button.classList.toggle('button-primary', active)
  })
  render()
}

const setDay = step => {
  dayIndex = (dayIndex + step + days.length) % days.length
  render()
}

const makeDayButton = (iconClass, label, step) => {
  const button = make('button', 'button button-outline button-icon compact')
  button.type = 'button'
  button.setAttribute('aria-label', label)
  button.appendChild(make('i', iconClass))
  button.addEventListener('click', () => setDay(step))
  return button
}

const makeView = mode => {
  const button = make('button', 'button button-outline compact')
  const icon = make('i', mode === 'columns' ? 'fa-solid fa-table-columns' : 'fa-solid fa-layer-group')
  const label = make('span', '', mode[0].toUpperCase() + mode.slice(1))
  button.dataset.view = mode
  button.title = mode
  button.type = 'button'
  button.setAttribute('aria-label', mode)
  button.appendChild(icon)
  button.appendChild(label)
  button.addEventListener('click', () => setView(mode))
  return button
}

Promise.all([fetch('events.json').then(r => r.json()), fetch('quotes.json').then(r => r.json())]).then(
  ([data, quoteData]) => {
    days = data.days
    quotes = quoteData
    dayIndex = Math.max(
      days.findIndex(({ id }) => id === new Date().toLocaleDateString('en-CA')),
      0,
    )
    const group = make('div', 'button-group')
    group.id = 'events-toggle'
    day.appendChild(makeDayButton('fa-regular fa-angle-left', 'Previous day', -1))
    day.appendChild(makeDayButton('fa-regular fa-angle-right', 'Next day', 1))
    data.views.forEach(mode => view.appendChild(makeView(mode)))
    ;[...view.children].forEach(button => group.appendChild(button))
    view.appendChild(group)
    setView(data.views[0])
  },
)
