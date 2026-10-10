// Blog posts for the app. Each post is one file in src/content/blog (see the README there).
// Listings load only each post's small `meta` part (scripts/blog-meta.js); the article body is
// downloaded when someone opens the post.
const metaModules = import.meta.glob(
  ['../content/blog/*.js', '!../content/blog/index.js', '!../content/blog/inline.js'],
  { eager: true, query: '?meta' }
);
const bodyLoaders = import.meta.glob(
  ['../content/blog/*.js', '!../content/blog/index.js', '!../content/blog/inline.js'],
  { import: 'default' }
);

const fileKey = (key) => key.split('?')[0];

// Newest first
export const posts = Object.entries(metaModules)
  .map(([key, mod]) => ({ ...mod.meta, readMinutes: mod.readMinutes, loadBody: bodyLoaders[fileKey(key)] }))
  .sort((a, b) => b.dateISO.localeCompare(a.dateISO) || a.title.localeCompare(b.title));

export const findPost = (id) => posts.find((post) => post.id === id);

// Categories in use, most posts first
export const categories = Object.entries(
  posts.reduce((counts, post) => ({ ...counts, [post.category]: (counts[post.category] || 0) + 1 }), {})
)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([name, count]) => ({ name, count }));

// Posts about the same project first, then the same category, then shared tags, then newest
export function relatedPosts(post, count = 3) {
  const score = (other) =>
    (post.project && other.project === post.project ? 4 : 0) +
    (other.category === post.category ? 2 : 0) +
    other.tags.filter((tag) => post.tags.includes(tag)).length;
  return posts
    .filter((other) => other.id !== post.id)
    .map((other, index) => ({ other, index, score: score(other) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, count)
    .map(({ other }) => other);
}

export const readTime = (minutes) => `${minutes} min read`;
