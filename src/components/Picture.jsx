import React from "react";
import { imageSrcSet } from "../lib/images";

// A photo from public/img: AVIF for browsers that support it, WebP otherwise, each in a few widths
// (see src/lib/images.js). `base` is the path without extension, e.g. "img/work/pos".
// `priority` is for the page's main image: it loads first instead of waiting its turn.
// `focus` sets object-position for crops, e.g. "48% 60%".
const Picture = ({
  base,
  alt,
  sizes = "(min-width: 1000px) 600px, 100vw",
  width = 1200,
  height = 800,
  eager = false,
  priority = false,
  className,
  focus,
}) => (
  <picture>
    <source type="image/avif" srcSet={imageSrcSet(base, "avif")} sizes={sizes} />
    <img
      src={`/${base}.webp`}
      srcSet={imageSrcSet(base, "webp")}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={eager || priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
      style={focus ? { objectPosition: focus } : undefined}
    />
  </picture>
);

export default Picture;
