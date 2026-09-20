// Records the cumulative download counts of every release once a day.
//
// Since 0.8.5 the app checks for updates at most once per 24 hours per machine, and every check
// downloads latest-mac.yml or latest.yml from the newest release. The daily increase of those two
// counters is therefore close to "machines that used cowork that day", split by platform. The
// installer counters give new downloads. Nothing is reported by the app; these numbers are what
// GitHub already counts for any public release.
//
// Usage: node stats/collect.mjs            (GITHUB_TOKEN is optional; it only raises the API limit)
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO = process.env.GITHUB_REPOSITORY || 'coworkagent/cowork-releases'
const here = dirname(fileURLToPath(import.meta.url))
const CSV = join(here, 'daily.csv')
const JSON_OUT = join(here, '..', 'docs', 'stats', 'daily.json')
const HEADER = 'date,checks_mac,checks_win,dl_mac_arm64,dl_mac_x64,dl_win_x64,dl_win_arm64,latest'

async function releases() {
  const out = []
  for (let page = 1; page < 20; page++) {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=100&page=${page}`, {
      headers: { Accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) },
    })
    if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`)
    const batch = await res.json()
    out.push(...batch)
    if (batch.length < 100) break
  }
  return out.filter(r => !r.draft)
}

const KIND = [
  [/^latest-mac\.yml$/, 'checks_mac'], [/^latest\.yml$/, 'checks_win'],
  [/-mac-arm64\.dmg$/, 'dl_mac_arm64'], [/-mac-x64\.dmg$/, 'dl_mac_x64'],
  [/-win-x64-setup\.exe$/, 'dl_win_x64'], [/-win-arm64-setup\.exe$/, 'dl_win_arm64'],
]

const all = await releases()
const totals = Object.fromEntries(KIND.map(([, key]) => [key, 0]))
// Counters restart from zero with every release, so the running total is the sum over all of them.
for (const release of all) for (const asset of release.assets) {
  const hit = KIND.find(([re]) => re.test(asset.name))
  if (hit) totals[hit[1]] += asset.download_count
}
const latest = all.find(r => !r.prerelease)?.tag_name ?? ''

// One row per day, in Beijing time, since that is where the day boundaries of most users fall.
const date = new Date(Date.now() + 8 * 3600_000).toISOString().slice(0, 10)
const row = [date, ...KIND.map(([, key]) => totals[key]), latest].join(',')
const lines = existsSync(CSV) ? readFileSync(CSV, 'utf8').trim().split('\n') : [HEADER]
if (lines[0] !== HEADER) throw new Error('daily.csv has an unexpected header')
const body = lines.slice(1).filter(l => l && !l.startsWith(date + ','))
body.push(row)
writeFileSync(CSV, [HEADER, ...body].join('\n') + '\n')

// The page wants daily increases, not running totals. A total can drop when a release is deleted,
// so an increase is never negative.
const keys = KIND.map(([, key]) => key)
const parsed = body.map(l => { const c = l.split(','); return { date: c[0], totals: Object.fromEntries(keys.map((k, i) => [k, Number(c[i + 1])])), latest: c[keys.length + 1] } })
const days = parsed.map((d, i) => {
  const prev = parsed[i - 1]
  const inc = Object.fromEntries(keys.map(k => [k, prev ? Math.max(0, d.totals[k] - prev.totals[k]) : null]))
  return { date: d.date, latest: d.latest, ...inc, totals: d.totals }
})
writeFileSync(JSON_OUT, JSON.stringify({ updated: new Date().toISOString(), days }, null, 1) + '\n')
console.log(row)
