// Inline formatting for blog text: **bold**, *italic*, `code` and [link text](/path or https://...).
// Returns plain tokens so both the React renderer and the static-page build can use it.
const PATTERN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|\*[^*\s][^*]*\*)/g;

export function tokenizeInline(text = '') {
  const tokens = [];
  let last = 0;
  for (const match of String(text).matchAll(PATTERN)) {
    if (match.index > last) tokens.push({ type: 'text', text: text.slice(last, match.index) });
    const raw = match[0];
    if (raw.startsWith('**')) tokens.push({ type: 'bold', text: raw.slice(2, -2) });
    else if (raw.startsWith('`')) tokens.push({ type: 'code', text: raw.slice(1, -1) });
    else if (raw.startsWith('[')) {
      const [, label, href] = raw.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      tokens.push({ type: 'link', text: label, href });
    } else tokens.push({ type: 'em', text: raw.slice(1, -1) });
    last = match.index + raw.length;
  }
  if (last < text.length) tokens.push({ type: 'text', text: text.slice(last) });
  return tokens;
}

// Plain text without markup (used for reading time, meta tags and search snippets)
export const plainInline = (text = '') => tokenizeInline(text).map((t) => t.text).join('');
