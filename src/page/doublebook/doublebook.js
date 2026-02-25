const timeElements = document.querySelectorAll('[data-clock]')
const relativeTimeElements = document.querySelectorAll('[data-relative-time]')

if (timeElements.length) {
  const now = new Date()
  const h = now.getHours() % 12 || 12
  const m = String(now.getMinutes()).padStart(2, '0')
  const period = now.getHours() >= 12 ? 'PM' : 'AM'
  timeElements.forEach(el => (el.textContent = `${h}:${m} ${period}`))
}

if (relativeTimeElements.length) {
  const startedAt = Date.now()
  const setRelativeTime = () => {
    const minutes = Math.floor((Date.now() - startedAt) / 60000)
    relativeTimeElements.forEach(el => (el.textContent = minutes ? `${minutes}m ago` : 'just now'))
  }
  setRelativeTime()
  setInterval(setRelativeTime, 60000)
}

const storyTabs = [...document.querySelectorAll('[data-story-tab]')]
const storyPanels = [...document.querySelectorAll('[data-story-panel]')]
const cycleTabs = storyTabs.filter(tab => ['client', 'search'].includes(tab.dataset.storyTab))

if (cycleTabs.length && storyPanels.length) {
  const setStoryTab = key => {
    storyTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.storyTab === key))
    storyPanels.forEach(panel => panel.classList.toggle('active', panel.dataset.storyPanel === key))
  }

  storyTabs.forEach(tab =>
    tab.addEventListener('click', () => tab.dataset.storyTab && setStoryTab(tab.dataset.storyTab)),
  )

  let index = 0
  setInterval(() => {
    index = (index + 1) % cycleTabs.length
    setStoryTab(cycleTabs[index].dataset.storyTab)
  }, 5000)
}
