// Every photo in public/img is published as AVIF, with a WebP fallback, in a few widths.
// The largest width has no suffix (img/work/pos.avif); smaller ones do (img/work/pos-640.avif).
// Shared by <Picture> and by the build's static pages (scripts/static-pages.js), which preload each
// page's main image; both must use the same widths and sizes or the browser downloads it twice.
const WIDTHS = [
  [/^img\/me\/avatar$/, [128, 256]],
  [/^img\/me\//, [480, 960]],
  [/^img\/(work|blog)\//, [640, 960, 1200]],
  [/^img\/[^/]+$/, [640, 960, 1280]],
];

export const imageWidths = (base) => WIDTHS.find(([pattern]) => pattern.test(base))?.[1];

// "img/work/pos" at 640px -> "img/work/pos-640.avif"; the largest width has no suffix
export const imageFile = (base, width, ext) => {
  const widths = imageWidths(base);
  return `${base}${width === widths[widths.length - 1] ? '' : `-${width}`}.${ext}`;
};

export const imageSrcSet = (base, ext) =>
  imageWidths(base).map((w) => `/${imageFile(base, w, ext)} ${w}w`).join(', ');

// Every file one image needs (used by the build check and `npm run images`)
export const imageFiles = (base) =>
  ['avif', 'webp'].flatMap((ext) => imageWidths(base).map((w) => imageFile(base, w, ext)));

// "img/blog/x.webp" or "/img/blog/x.webp" -> "img/blog/x"
export const imageBase = (src) => src.replace(/^\//, '').replace(/\.(webp|avif|png|jpe?g)$/, '');

// How wide each kind of image is drawn, for the browser to pick a file
export const SIZES = {
  heroPortrait: '240px',
  heroTile: '(min-width: 900px) 380px, 100vw',
  projectCard: '(min-width: 1000px) 360px, (min-width: 640px) 50vw, 100vw',
  caseStudy: '(min-width: 1000px) 960px, 100vw',
  blogFeatured: '(min-width: 900px) 600px, 100vw',
  blogCard: '(min-width: 1000px) 360px, (min-width: 640px) 50vw, 100vw',
  postCover: '(min-width: 1000px) 560px, 100vw',
  relatedPost: '(min-width: 700px) 340px, 100vw',
  postProject: '(min-width: 900px) 220px, 100vw',
};

// Link previews: LinkedIn and WhatsApp need JPEG or PNG, so each blog cover also has a 1200x630 JPEG
export const blogOgImage = (id) => `/img/blog/og/${id}.jpg`;
