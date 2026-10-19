// Run after building both apps with VITE_ENABLE_USABILITY_TESTING=true.
import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
for (const app of ['mother-pwa', 'admin-web']) {
  const assets = new URL(`../../../${app}/dist/assets/`, import.meta.url)
  const files = (await readdir(assets)).filter(file => file.endsWith('.js'))
  assert.ok(files.length > 0, `Build ${app} before running the production check.`)
  for (const file of files) {
    const code = await readFile(new URL(file, assets), 'utf8')
    for (const marker of ['UsabilityTesting', 'consentConfirmed', 'task_start', 'mothercare-usability-sessions.json']) assert.ok(!code.includes(marker), `${app}/${file} contains recording implementation: ${marker}`)
  }
  console.log(`PASS: ${app} production JavaScript excludes the usability implementation.`)
}
