const year = String(new Date().getFullYear())

document.querySelectorAll('.copyright').forEach(node => {
  node.textContent = (node.textContent || '').replace(/\b20\d{2}\b/g, year)
})
