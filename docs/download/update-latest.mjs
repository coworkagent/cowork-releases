// Writes docs/download/latest.json from the latest published release, so the download page
// can list the files without calling the GitHub API (rate-limited, and slow from some regions).
// Usage: node docs/download/update-latest.mjs [tag]     (needs the gh CLI)
import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO = 'coworkagent/cowork-releases'
const tag = process.argv[2]
const env = { ...process.env }
for (const k of ['http_proxy', 'https_proxy', 'all_proxy', 'HTTP_PROXY', 'HTTPS_PROXY', 'ALL_PROXY']) delete env[k]
const raw = execFileSync('gh', ['api', `repos/${REPO}/releases/${tag ? `tags/${tag}` : 'latest'}`], { encoding: 'utf8', env })
const release = JSON.parse(raw)
const assets = release.assets
  .filter(a => /\.(dmg|exe)$/.test(a.name))
  .map(a => ({ name: a.name, size: a.size, url: a.browser_download_url }))
if (assets.length !== 4) throw new Error(`expected 4 installers, found ${assets.length}`)
const out = { version: release.tag_name.replace(/^v/, ''), published: release.published_at, assets }
writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'latest.json'), JSON.stringify(out, null, 2) + '\n')
console.log(`latest.json -> ${out.version}, ${assets.length} installers`)
