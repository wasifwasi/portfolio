import React from "react";
import Picture from "./Picture";
import { imageBase } from "../lib/images";

// A project's image, given as its path in public/img (e.g. "img/work/pos.webp"). Logos are contained, not cropped.
const ProjectImage = ({ src, alt, contain = false, sizes = "100vw", eager = false, priority = false }) => (
  <Picture
    base={imageBase(src)}
    alt={alt}
    sizes={sizes}
    eager={eager}
    priority={priority}
    className={contain ? "is-contained" : undefined}
  />
);

export default ProjectImage;
