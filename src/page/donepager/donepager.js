const fields = {
  audience: document.querySelector('#pager-audience'),
  done: document.querySelector('#pager-done'),
  kicker: document.querySelector('#pager-kicker'),
  outcome: document.querySelector('#pager-outcome'),
  scope: document.querySelector('#pager-scope'),
  summary: document.querySelector('#summary'),
  title: document.querySelector('#pager-title'),
}
const make = (tag, className, text) => {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text) node.textContent = text
  return node
}
const input = document.querySelector('#input')
const inputField = document.querySelector('#input-field')
const pager = document.querySelector('#pager')
const parlay = document.querySelector('#output-actions .button-outline')
const presetList = document.querySelector('#preset-list')
const stageOrder = ['input', 'templates', 'output']
const stagePanels = [...document.querySelectorAll('.stage-panel')]
const stageTabs = [...document.querySelectorAll('#stage-tabs .tab')]
const templateList = document.querySelector('#template-list')
const textarea = document.querySelector('textarea')
let presets = []
let templates = []

const syncThumb = () => {
  let thumb = document.querySelector('#input-thumb')
  if (!pager || !input || !inputField) return
  if (!thumb) {
    thumb = make('div')
    thumb.id = 'input-thumb'
    input.insertBefore(thumb, inputField)
  }
  const clone = pager.cloneNode(true)
  clone.removeAttribute('id')
  clone.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'))
  thumb.replaceChildren(clone)
}
const setStage = key => {
  const index = stageOrder.indexOf(key)
  stageTabs.forEach(tab => {
    const tabIndex = stageOrder.indexOf(tab.dataset.stage)
    tab.classList.toggle('active', tab.dataset.stage === key)
    tab.classList.toggle('completed', tabIndex > -1 && tabIndex < index)
  })
  stagePanels.forEach(panel => panel.classList.toggle('active', panel.dataset.panel === key))
}
const setTemplate = template => {
  templates.forEach(card => card.classList.toggle('active', card === template))
  Object.entries(fields).forEach(([key, el]) => el && (el.textContent = template.dataset[key]))
  if (document.querySelector('#input-thumb')) syncThumb()
}
const setPreset = preset => {
  presets.forEach(card => card.classList.toggle('active', card === preset))
  if (textarea) textarea.value = preset.dataset.input
  const template = templates.find(card => card.dataset.id === preset.dataset.templateId)
  if (template) setTemplate(template)
}
const makePreset = ({ input, subtitle, templateId, title }) => {
  const card = make('article', 'card preset')
  const header = make('div', 'card-header')
  const strong = make('strong', '', title)
  const text = make('p', '', subtitle)
  card.dataset.input = input
  card.dataset.templateId = templateId
  header.appendChild(strong)
  header.appendChild(text)
  card.appendChild(header)
  card.addEventListener('click', () => setPreset(card))
  return card
}
const makeTemplate = template => {
  const card = make('article', 'card template')
  const header = make('div', 'card-header')
  const meta = make('div', 'template-meta')
  const top = make('div', 'template-top')
  const strong = make('strong', '', template.kicker)
  const tag = template.tag ? make('span', 'chip', template.tag) : null
  const tier = make('span', 'template-tier', template.tier)
  const text = make('p', '', template.superlative)
  Object.entries(template).forEach(([key, value]) => (card.dataset[key] = value))
  if (tag) meta.appendChild(tag)
  meta.appendChild(tier)
  top.appendChild(strong)
  top.appendChild(meta)
  header.appendChild(top)
  header.appendChild(text)
  card.appendChild(header)
  card.addEventListener('click', () => setTemplate(card))
  return card
}

fetch('donepager.json')
  .then(res => res.json())
  .then(({ presets: presetData, templates: templateData }) => {
    templateData.forEach(template => templateList.appendChild(makeTemplate(template)))
    presetData.forEach(preset => presetList.appendChild(makePreset(preset)))
    presets = [...document.querySelectorAll('.preset')]
    templates = [...document.querySelectorAll('.template')]
    if (presets[0]) setPreset(presets[0])
  })

stageTabs.forEach(tab => tab.addEventListener('click', () => setStage(tab.dataset.stage)))
if (parlay) parlay.addEventListener('click', () => (syncThumb(), setStage('input')))
document
  .querySelectorAll('[data-next-stage]')
  .forEach(btn => btn.addEventListener('click', () => setStage(btn.dataset.nextStage)))
