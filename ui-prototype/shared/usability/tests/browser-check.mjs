// Run with both usability dev servers started. Uses Playwright if installed locally,
// or PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs from an existing installation.
import assert from 'node:assert/strict'
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const browser = await chromium.launch({ headless: true })
const errors = []
async function jsonExport(page, button = 'Export all sessions JSON') {
  const waiting = page.waitForEvent('download')
  await page.getByRole('button', { name: button, exact: true }).click()
  const download = await waiting
  const stream = await download.createReadStream()
  let content = ''
  for await (const chunk of stream) content += chunk.toString()
  return { name: download.suggestedFilename(), content, data: JSON.parse(content) }
}
async function csvExport(page, button, filename) {
  const waiting = page.waitForEvent('download')
  await page.getByRole('button', { name: button, exact: true }).click()
  const download = await waiting
  assert.equal(download.suggestedFilename(), filename)
  const stream = await download.createReadStream()
  let content = ''
  for await (const chunk of stream) content += chunk.toString()
  assert.ok(content.startsWith('"application","sessionId"'))
  return content
}
async function open(url, viewport) {
  const page = await browser.newPage({ viewport })
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(url)
  await page.getByRole('complementary', { name: 'Usability testing observer panel' }).waitFor()
  await page.locator('aside[data-usability-exclude] > details > summary').click()
  assert.equal(await page.getByRole('button', { name: 'Start new session', exact: true }).isDisabled(), true)
  return page
}
async function start(page, id = '') {
  await page.getByLabel('Tester label').fill('Tester 01')
  if (id) await page.getByLabel('Anonymous tester ID (optional; reuse across apps)').fill(id)
  await page.getByLabel('Participant has explicitly consented').check()
  await page.getByRole('button', { name: 'Start new session', exact: true }).click()
  await page.getByRole('button', { name: 'Start task timer', exact: true }).click()
  assert.equal(await page.getByRole('button', { name: 'Start task timer', exact: true }).isDisabled(), true)
}
try {
  const mother = await open(process.env.MOTHER_URL || 'http://localhost:5173', { width: 390, height: 844 })
  await start(mother)
  // Panel interactions are excluded, including nested summaries and form fields.
  let snapshot = await jsonExport(mother)
  assert.equal(snapshot.data.sessions[0].events.filter(event => event.eventType === 'click').length, 0)
  const testerId = snapshot.data.sessions[0].testerId
  const nav = mother.getByRole('navigation', { name: 'Main', exact: true })
  await nav.getByRole('link', { name: 'Resources', exact: true }).click()
  await mother.getByRole('button', { name: 'Filters', exact: true }).click()
  await mother.getByRole('button', { name: 'Diapers', exact: true }).click()
  await mother.locator('[data-usability-id="resource-view"]').first().click()
  await mother.goBack()
  await mother.getByRole('heading', { name: 'Resources', exact: true }).waitFor()
  await mother.goForward()
  await mother.getByRole('heading', { name: 'Western PA Diaper Bank', exact: true }).waitFor()
  await mother.getByLabel('Assistance provided', { exact: true }).check()
  await mother.getByRole('button', { name: /Record another assistance intervention/ }).click()
  await mother.getByLabel('Ease of use rating', { exact: true }).selectOption('3')
  await mother.getByLabel(/Observer note/).fill('Observed a pause before selecting a category.')
  await mother.getByRole('button', { name: 'Mark completed', exact: true }).click()
  await mother.getByLabel('Representative task', { exact: true }).selectOption('PWA-03')
  await mother.getByRole('button', { name: 'Start task timer', exact: true }).click()
  // Private query, hash, input contents and DOM text must never enter logs.
  await mother.evaluate(() => { window.history.pushState({}, '', '/profile?token=PRIVATE_TOKEN#PRIVATE_HASH'); window.dispatchEvent(new PopStateEvent('popstate')) })
  await mother.getByRole('heading', { name: 'Your profile', exact: true }).waitFor()
  const email = mother.locator('input[type=email]')
  await email.fill('PRIVATE_INPUT@example.invalid')
  await email.press('Tab')
  await mother.getByRole('button', { name: 'End session', exact: true }).click()
  const motherExport = await jsonExport(mother)
  assert.equal(motherExport.name, 'mothercare-usability-sessions.json')
  const motherSession = motherExport.data.sessions[0]
  assert.deepEqual(motherSession.tasks.map(task => task.status), ['completed', 'incomplete'])
  assert.equal(motherSession.tasks[0].assistanceInterventions, 2)
  assert.equal(motherSession.tasks[0].easeOfUseRating, 3)
  assert.equal(motherSession.tasks[0].observerNotes, 'Observed a pause before selecting a category.')
  assert.equal(motherSession.events.filter(event => event.eventType === 'click').length, 4)
  assert.ok(motherSession.events.filter(event => event.navigationKind === 'POP').length >= 2)
  for (const privateValue of ['PRIVATE_TOKEN', 'PRIVATE_HASH', 'PRIVATE_INPUT', 'diaper-bank']) assert.ok(!motherExport.content.includes(privateValue), privateValue)
  await mother.getByRole('button', { name: 'Open results summary', exact: true }).click()
  const motherCsv = await csvExport(mother, 'Export mother-pwa summary CSV', 'mothercare-mother-pwa-summary.csv')
  assert.match(motherCsv, /"mother-pwa"/)
  await csvExport(mother, 'Export mother-pwa events CSV', 'mothercare-mother-pwa-events.csv')
  assert.equal(await mother.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false)

  const admin = await open(process.env.ADMIN_URL || 'http://localhost:5174', { width: 1280, height: 900 })
  await admin.getByRole('combobox', { name: 'Demo role', exact: true }).selectOption('Counselor')
  await start(admin, testerId)
  await admin.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'Mothers', exact: true }).click()
  await admin.getByLabel('Search mothers', { exact: true }).fill('PRIVATE_SEARCH')
  await admin.getByLabel('Search mothers', { exact: true }).fill('')
  await admin.locator('[data-usability-id="mother-open"]').first().click()
  await admin.getByRole('button', { name: 'Mark completed', exact: true }).click()
  await admin.getByLabel('Representative task', { exact: true }).selectOption('ADMIN-02')
  await admin.getByRole('button', { name: 'Start task timer', exact: true }).click()
  await admin.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'Goals', exact: true }).click()
  await admin.getByLabel('Goal title', { exact: true }).fill('Synthetic usability test goal')
  await admin.getByLabel('Description', { exact: true }).fill('Synthetic assignment to verify the existing workflow.')
  await admin.getByRole('button', { name: 'Assign goal', exact: true }).click()
  await admin.getByRole('button', { name: 'Mark completed', exact: true }).click()
  await admin.getByRole('button', { name: 'End session', exact: true }).click()
  const adminExport = await jsonExport(admin)
  const adminSession = adminExport.data.sessions[0]
  assert.equal(adminSession.application, 'admin-web')
  assert.equal(adminSession.testerId, testerId)
  assert.equal(adminSession.tasks.length, 2)
  assert.ok(adminSession.events.some(event => event.elementId === 'mother-open'))
  assert.ok(adminSession.events.some(event => event.elementId === 'goal-save'))
  assert.ok(adminSession.events.some(event => event.route === '/admin/mothers/:motherId'))
  assert.ok(!adminExport.content.includes('PRIVATE_SEARCH'))
  assert.ok(!adminExport.content.includes('Synthetic usability test goal'))
  await admin.getByRole('button', { name: 'Open results summary', exact: true }).click()
  await csvExport(admin, 'Export admin-web events CSV', 'mothercare-admin-events.csv')
  await csvExport(admin, 'Export admin-web summary CSV', 'mothercare-admin-summary.csv')
  assert.equal(await admin.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false)

  // Combine two origins, reimport, inspect separate app summaries and the real event timeline.
  for (let count = 0; count < 2; count++) {
    await mother.getByLabel('Import MotherCare session JSON').setInputFiles({ name: 'admin.json', mimeType: 'application/json', buffer: Buffer.from(adminExport.content) })
    await mother.getByRole('status').filter({ hasText: 'Imported 1 sessions' }).waitFor()
  }
  const combined = await jsonExport(mother)
  assert.equal(combined.data.sessions.length, 2)
  assert.equal(new Set(combined.data.sessions.flatMap(session => session.events.map(event => event.eventId))).size, combined.data.sessions.reduce((count, session) => count + session.events.length, 0))
  await mother.getByText('1 anonymous participants · 2 sessions across both apps.', { exact: false }).waitFor()
  await mother.getByLabel('Results view').selectOption('admin-web')
  await mother.getByRole('list', { name: 'Recorded event timeline' }).waitFor()
  await mother.getByLabel('Results view').selectOption('mother-pwa')
  await mother.getByRole('list', { name: 'Recorded event timeline' }).waitFor()
  // Check the observer interface against the existing Home layout at narrow widths.
  await mother.getByRole('navigation', { name: 'Main', exact: true }).getByRole('link', { name: 'Home', exact: true }).click()
  for (const width of [320, 430, 768]) {
    await mother.setViewportSize({ width, height: 844 })
    const overflow = await mother.evaluate(() => [...document.querySelectorAll('body *')].filter(element => element.getBoundingClientRect().right > window.innerWidth + 1).map(element => ({ tag: element.tagName, classes: String(element.className).slice(0, 80), insidePanel: !!element.closest('[data-usability-exclude]'), right: element.getBoundingClientRect().right })).slice(0, 12))
    const widths = await mother.evaluate(() => {
      const panel = document.querySelector('[data-usability-exclude]')
      const withPanel = document.documentElement.scrollWidth
      panel.style.display = 'none'
      const withoutPanel = document.documentElement.scrollWidth
      panel.style.display = ''
      return { withPanel, withoutPanel, viewport: window.innerWidth }
    })
    assert.ok(widths.withPanel <= Math.max(widths.viewport, widths.withoutPanel), `Observer panel adds overflow at ${width}px: ${JSON.stringify({ widths, overflow })}`)
    if (widths.withoutPanel > widths.viewport) console.log(`NOTE: Existing PWA layout has ${widths.withoutPanel}px scroll width at ${width}px; observer panel adds no overflow.`)
  }
  assert.deepEqual(errors, [])
  console.log('PASS: Both browser integrations; consent, clicks, privacy, POP navigation, tasks, timing, assistance, CSV/JSON downloads, cross-origin imports, deduplication, timelines and no additional narrow-screen overflow.')
  // Production preview URLs are optional; always verify their built bundles separately as documented.
  for (const url of (process.env.PRODUCTION_URLS || '').split(',').filter(Boolean)) {
    const page = await browser.newPage()
    await page.goto(`${url}/?usability=true&VITE_ENABLE_USABILITY_TESTING=true`)
    await page.evaluate(() => { localStorage.setItem('VITE_ENABLE_USABILITY_TESTING', 'true'); sessionStorage.setItem('usability', 'true') })
    await page.reload()
    await page.locator('nav').first().waitFor()
    assert.equal(await page.locator('[data-usability-exclude]').count(), 0)
    console.log(`PASS: Production panel unavailable at ${url}, despite URL/storage flags.`)
  }
} finally { await browser.close() }
