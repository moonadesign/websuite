require('dotenv').config()
const puppeteer = require('puppeteer')
const sharp = require('sharp')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

cloudinary.config({ secure: true })

const THUMBS = 'src/thumbs.json'
const CONTENT = 'src/content.json'
const BASE = 'http://localhost:2507'

const toName = url => (url === '/' ? 'home' : url.replace(/^\/|\/$/g, '').replace(/\//g, '-'))
const upload = buf =>
  new Promise((resolve, reject) =>
    cloudinary.uploader
      .upload_stream({ folder: 'Websuite', format: 'png' }, (err, res) => (err ? reject(err) : resolve(res)))
      .end(buf),
  )

const run = async () => {
  const map = fs.existsSync(THUMBS) ? JSON.parse(fs.readFileSync(THUMBS, 'utf8')) : {}
  const content = JSON.parse(fs.readFileSync(CONTENT, 'utf8'))
  const items = content.filter(i => i.route)
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 960 })
  for (const item of items) {
    const name = toName(item.url)
    if (map[name]) {
      console.log(`⏭️  ${item.name}`)
      continue
    }
    await page.goto(`${BASE}${item.url}`, { waitUntil: 'networkidle2' })
    const buf = await page.screenshot()
    const resized = await sharp(buf).resize(640, 480).toBuffer()
    const result = await upload(resized)
    map[name] = result.secure_url
    fs.writeFileSync(THUMBS, JSON.stringify(map, null, 2))
    console.log(`📸 ${item.name}`)
  }
  await browser.close()
  for (const item of content) {
    if (!item.url) continue
    const name = toName(item.url)
    if (map[name]) item.thumb = `url(${map[name]})`
  }
  fs.writeFileSync(CONTENT, JSON.stringify(content, null, 2))
}

run().catch(console.error)
