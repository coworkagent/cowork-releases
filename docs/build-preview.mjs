// Builds cowork-landing-preview.html: index.html with fonts and screenshots inlined,
// so the page can be opened or shared as a single file.
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' }
const inline = rel => `data:${MIME[extname(rel)]};base64,${readFileSync(join(here, rel)).toString('base64')}`

const html = readFileSync(join(here, 'index.html'), 'utf8')
  .replace(/(src|href)="((?:assets|fonts)\/[^"]+)"/g, (_m, attr, rel) => `${attr}="${inline(rel)}"`)
  .replace(/url\((['"]?)((?:assets|fonts)\/[^'")]+)\1\)/g, (_m, _q, rel) => `url(${inline(rel)})`)
writeFileSync(join(here, 'cowork-landing-preview.html'), html)
console.log(`cowork-landing-preview.html ${(html.length / 1e6).toFixed(1)} MB`)
