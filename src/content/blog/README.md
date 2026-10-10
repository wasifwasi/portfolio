# Blog posts

One file per post: `src/content/blog/<id>.js`. The file name is the URL: `/blog/<id>`.
After adding a post, add it to `index.js` (the build checks that every file is listed, that every
`/projects/...` and `/blog/...` link points somewhere real, and that every block type is known).

The blog page and related posts read only `meta` (through `scripts/blog-meta.js`, which also works out
the reading time); the body is downloaded when someone opens the post.

Each file has two exports:

```js
export const meta = { ... };   // listing, search and social data (small, loaded on the blog page)
export default { ... };        // the article body (loaded only on the post page)
```

## `meta`

| Field | Rules |
|---|---|
| `id` | Same as the file name. Never change it once published (it is the URL). |
| `title` | The H1 and the search-result title. Lead with the main keyword. 45–65 characters. Specific, not clickbait. |
| `excerpt` | The meta description and the card text. 140–160 characters. Says what the reader learns, includes the main keyword once. |
| `date`, `dateISO` | Publication date, e.g. `'June 21, 2026'` and `'2026-06-21'`. |
| `category` | One of: `AI agents`, `AI document processing`, `Automation`, `SaaS architecture`, `Product design`, `3D & web graphics`, `Mobile`, `Web development`, `Security`, `Opinion`. |
| `keywords` | 5–8 search phrases people actually type, most important first. |
| `tags` | 3–5 short technology or topic tags shown on the card. |
| `project` | Slug of the related case study (`umrahflow`, `bpoai`, …) or `null`. |
| `cover` | `{ src: '/img/blog/<id>.webp', alt: '...' }`, or `null` until a cover is made. Covers are 16:9 WebP files in `public/img/blog`: `<id>.webp` (1200×675) and `<id>-640.webp`. The image is also the post's social preview. Add `credit` only if the cover is not generated; the caption defaults to "Image generated for this article". |

## Body

| Field | Rules |
|---|---|
| `dek` | One or two sentences under the H1. Plain, specific, keyword-rich. |
| `stats` | Optional, up to 4 `{ value, label }`. **Only numbers that appear in the post itself.** Leave it out otherwise. |
| `sections` | 4–7 sections, each `{ id, eyebrow, heading, blocks }`. `id` is a short kebab-case anchor. `eyebrow` is 1–3 words. `heading` is the H2: a phrase a reader might search for, using the post's keywords naturally. |
| `pullQuote` | Optional `{ text, after }`: a strong sentence from the post, shown full width after section number `after` (0-based). |
| `takeaways` | 3–5 one-sentence lessons. |
| `faq` | 3–5 `{ q, a }` questions people search for, answered from the post's own content. |

### Blocks inside a section

| Block | Shape |
|---|---|
| Paragraph | `{ type: 'p', text }` |
| List | `{ type: 'list', items: [text], ordered: false }` |
| Steps | `{ type: 'steps', items: [{ title, text }] }` |
| Table | `{ type: 'table', caption, head: [text], rows: [[text]] }` |
| Callout | `{ type: 'callout', tone: 'note' \| 'tip' \| 'warning', title, text }` |
| Quote | `{ type: 'quote', text, cite }` |
| Code | `{ type: 'code', lang, code }` |
| Flow diagram | `{ type: 'flow', caption, steps: [label] }` (a left-to-right pipeline) |

Text fields support `**bold**`, `*italic*`, `` `code` `` and `[link text](/projects/umrahflow)`.

## Writing rules

- Write in first person, in plain English. No long dashes; use commas, colons or full stops.
- Never invent facts, numbers, clients, results or version features. Everything must already be true of the project.
- Tables, steps, callouts and diagrams should organise what the post says, not add new claims.
- Link to the related case study (`/projects/<slug>`) and to related posts (`/blog/<id>`) where it helps the reader.
