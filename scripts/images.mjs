// Make the AVIF and WebP sizes the site serves for every photo in public/img (widths: src/lib/images.js).
// Add a photo as its largest size: public/img/work/<name>.webp, .png or .jpg (3:2, 1200px wide), or a blog
// cover as public/img/blog/<post id>.png (16:9). Then run `npm run images`. Only missing files are written,
// so delete a file to remake it. Blog covers also get the 1200x630 JPEG used for link previews.
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { imageWidths, imageFile } from '../src/lib/images.js'

const PUBLIC = path.resolve(import.meta.dirname, '../public')
const AVIF = { quality: 50, effort: 6, chromaSubsampling: '4:2:0' }
const WEBP = { quality: 80, effort: 6 }

// Base names (no extension, no width suffix) of every photo in the folders the site serves
function photoBases() {
  const bases = new Set()
  for (const dir of ['img', 'img/work', 'img/blog', 'img/me']) {
    for (const name of fs.readdirSync(path.join(PUBLIC, dir))) {
      const match = name.match(/^([a-z0-9-]+)\.(webp|avif|png|jpe?g)$/)
      if (!match) continue
      let base = `${dir}/${match[1]}`
      const sized = base.match(/^(.*)-(\d+)$/)
      if (sized && imageWidths(sized[1])?.includes(Number(sized[2]))) base = sized[1]
      if (imageWidths(base)) bases.add(base)
    }
  }
  return [...bases].sort()
}

// The best original: a PNG or JPEG if there is one, otherwise the largest WebP
const sourceOf = (base) =>
  ['png', 'jpg', 'jpeg', 'webp'].map((ext) => path.join(PUBLIC, `${base}.${ext}`)).find((file) => fs.existsSync(file))

let written = 0
for (const base of photoBases()) {
  const source = sourceOf(base)
  if (!source) continue
  for (const width of imageWidths(base)) {
    for (const [ext, options] of [['avif', AVIF], ['webp', WEBP]]) {
      const out = path.join(PUBLIC, imageFile(base, width, ext))
      if (fs.existsSync(out)) continue
      await sharp(source).resize({ width, withoutEnlargement: true })[ext](options).toFile(out)
      console.log(`wrote ${path.relative(PUBLIC, out)}`)
      written++
    }
  }
  if (base.startsWith('img/blog/')) {
    const og = path.join(PUBLIC, 'img/blog/og', `${path.basename(base)}.jpg`)
    if (!fs.existsSync(og)) {
      fs.mkdirSync(path.dirname(og), { recursive: true })
      await sharp(source).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 82, mozjpeg: true }).toFile(og)
      console.log(`wrote ${path.relative(PUBLIC, og)}`)
      written++
    }
  }
}
console.log(written ? `${written} files written` : 'All images are up to date')
