import React, { useRef, useEffect, useCallback, useState } from "react";

const PixelatedCanvas = ({
  src,
  width = 400,
  height = 400,
  cellSize = 4,
  dotScale = 0.9,
  shape = "square",
  backgroundColor = "#000000",
  interactive = true,
  distortionStrength = 3,
  distortionRadius = 80,
  distortionMode = "repel",
  followSpeed = 0.2,
  jitterStrength = 0,
  jitterSpeed = 1,
  className = "",
}) => {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const smoothMouseRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef(null);
  const pixelsRef = useRef([]);
  const [loaded, setLoaded] = useState(false);

  // Extract pixel colors from image
  const extractPixels = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;

    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const octx = offscreen.getContext("2d");
    octx.drawImage(img, 0, 0, width, height);

    const pixels = [];
    const cols = Math.ceil(width / cellSize);
    const rows = Math.ceil(height / cellSize);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * cellSize;
        const y = row * cellSize;
        const cx = Math.min(x + Math.floor(cellSize / 2), width - 1);
        const cy = Math.min(y + Math.floor(cellSize / 2), height - 1);

        const data = octx.getImageData(cx, cy, 1, 1).data;
        const r = data[0], g = data[1], b = data[2], a = data[3];

        if (a > 10) {
          pixels.push({
            x: x + cellSize / 2,
            y: y + cellSize / 2,
            r, g, b, a,
            ox: 0, oy: 0,
          });
        }
      }
    }

    pixelsRef.current = pixels;
  }, [width, height, cellSize]);

  // Distortion calculation
  const getDistortion = useCallback(
    (px, py, mx, my) => {
      const dx = px - mx;
      const dy = py - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > distortionRadius || dist === 0) return { dx: 0, dy: 0 };

      const factor =
        (1 - dist / distortionRadius) * distortionStrength * cellSize;
      const angle = Math.atan2(dy, dx);

      switch (distortionMode) {
        case "attract":
          return { dx: -Math.cos(angle) * factor, dy: -Math.sin(angle) * factor };
        case "swirl":
          return {
            dx: -Math.sin(angle) * factor,
            dy: Math.cos(angle) * factor,
          };
        case "repel":
        default:
          return { dx: Math.cos(angle) * factor, dy: Math.sin(angle) * factor };
      }
    },
    [distortionRadius, distortionStrength, distortionMode, cellSize]
  );

  // Animation loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const pixels = pixelsRef.current;
    const time = Date.now() * 0.001 * jitterSpeed;

    // Smooth mouse follow
    smoothMouseRef.current.x +=
      (mouseRef.current.x - smoothMouseRef.current.x) * followSpeed;
    smoothMouseRef.current.y +=
      (mouseRef.current.y - smoothMouseRef.current.y) * followSpeed;

    ctx.clearRect(0, 0, width, height);
    if (backgroundColor && backgroundColor !== "transparent") {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
    }

    const mx = smoothMouseRef.current.x;
    const my = smoothMouseRef.current.y;
    const dotSize = (cellSize * dotScale) / 2;

    for (let i = 0; i < pixels.length; i++) {
      const p = pixels[i];
      let drawX = p.x;
      let drawY = p.y;

      // Apply distortion
      if (interactive) {
        const d = getDistortion(p.x, p.y, mx, my);
        drawX += d.dx;
        drawY += d.dy;
      }

      // Apply jitter
      if (jitterStrength > 0) {
        drawX += Math.sin(time + i * 0.1) * jitterStrength;
        drawY += Math.cos(time + i * 0.13) * jitterStrength;
      }

      ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a / 255})`;

      if (shape === "circle") {
        ctx.beginPath();
        ctx.arc(drawX, drawY, dotSize, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(drawX - dotSize, drawY - dotSize, dotSize * 2, dotSize * 2);
      }
    }

    animFrameRef.current = requestAnimationFrame(render);
  }, [
    width, height, cellSize, dotScale, shape, backgroundColor,
    interactive, followSpeed, jitterStrength, jitterSpeed, getDistortion,
  ]);

  // Load image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgRef.current = img;
      setLoaded(true);
    };
    img.src = src;
  }, [src]);

  // Extract pixels once loaded
  useEffect(() => {
    if (loaded) extractPixels();
  }, [loaded, extractPixels]);

  // Start animation
  useEffect(() => {
    if (loaded && pixelsRef.current.length > 0) {
      animFrameRef.current = requestAnimationFrame(render);
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [loaded, render]);

  // Mouse tracking
  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    mouseRef.current.x = (e.clientX - rect.left) * scaleX;
    mouseRef.current.y = (e.clientY - rect.top) * scaleY;
  }, [width, height]);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`pixelated-canvas ${className}`}
      onMouseMove={interactive ? handleMouseMove : undefined}
      onMouseLeave={interactive ? handleMouseLeave : undefined}
    />
  );
};

export default PixelatedCanvas;
