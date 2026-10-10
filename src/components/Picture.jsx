import React from "react";

// Serves an image from public/img/work in two widths: `${base}-640.webp` and `${base}.webp` (1200px).
// `focus` sets object-position for crops, e.g. "48% 60%".
const Picture = ({ base, alt, sizes = "(min-width: 1000px) 600px, 100vw", eager = false, className = "", focus }) => (
  <img
    src={`/${base}.webp`}
    srcSet={`/${base}-640.webp 640w, /${base}.webp 1200w`}
    sizes={sizes}
    alt={alt}
    width={1200}
    height={800}
    loading={eager ? "eager" : "lazy"}
    decoding="async"
    className={className}
    style={focus ? { objectPosition: focus } : undefined}
  />
);

export default Picture;
