import React from "react";

// Project image from public/img. Images in img/work have a 640px version for small screens;
// older screenshots elsewhere are served as they are.
const ProjectImage = ({ src, alt, contain = false, sizes = "100vw", eager = false }) => {
  const responsive = src.startsWith("img/work/") && src.endsWith(".webp");
  const base = src.replace(/\.webp$/, "");
  return (
    <img
      src={`/${src}`}
      srcSet={responsive ? `/${base}-640.webp 640w, /${src} 1200w` : undefined}
      sizes={responsive ? sizes : undefined}
      alt={alt}
      width={1200}
      height={800}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={contain ? "is-contained" : undefined}
    />
  );
};

export default ProjectImage;
