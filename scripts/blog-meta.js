// Vite plugin: importing `src/content/blog/<id>.js?meta` gives only the post's `meta` export plus
// its reading time, without the article body. The blog listing, related posts and the chatbot use
// this, so the full text of a post is downloaded only when someone opens it.
import fs from 'fs'

const WORDS_PER_MINUTE = 230
const STRING_LITERAL = /'(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`/g
const WORD = /[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu

// Reading time from the text in a post body's source (every string in the `export default` object)
export function readMinutes(bodySource) {
  const text = (bodySource.match(STRING_LITERAL) || []).map((s) => s.slice(1, -1)).join(' ')
  return Math.max(1, Math.round((text.match(WORD) || []).length / WORDS_PER_MINUTE))
}

export function blogMeta() {
  return {
    name: 'blog-meta',
    enforce: 'pre',
    load(id) {
      const [file, query] = id.split('?')
      if (query !== 'meta') return null
      this.addWatchFile(file)
      const source = fs.readFileSync(file, 'utf8')
      const cut = source.search(/^export default/m)
      if (cut < 0 || !/^export const meta\s*=/m.test(source.slice(0, cut))) {
        this.error(`${file}: a blog post needs "export const meta = {...}" followed by "export default {...}"`)
      }
      return `${source.slice(0, cut)}\nexport const readMinutes = ${readMinutes(source.slice(cut))};\n`
    },
  }
}
