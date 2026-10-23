/**
 * Pure helpers for the hero sigil. Kept free of DOM APIs so they can be
 * unit tested and reused by the canvas renderer.
 */

export const GLYPHS = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '@'] as const;

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = clamp((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

export const glyphForDensity = (density: number): string => {
  const index = Math.round(clamp(density) * (GLYPHS.length - 1));
  return GLYPHS[index] ?? GLYPHS[0];
};

/** A deterministic 2D hash in [0, 1), used for noise and stagger delays. */
export const hash2 = (x: number, y: number, seed = 0): number => {
  const value = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453123;
  return value - Math.floor(value);
};

/**
 * Brightness field for a glyph sphere centred in a cols x rows grid.
 * The x axis is scaled by the grid aspect so the sphere stays circular.
 * Returns 0 outside the sphere.
 */
export const sphereDensity = (
  x: number,
  y: number,
  cols: number,
  rows: number,
  radius = 0.78,
): number => {
  const nx = ((x + 0.5) / cols) * 2 - 1;
  const ny = ((y + 0.5) / rows) * 2 - 1;
  const aspect = cols / rows;
  const sx = nx * aspect;
  const r2 = sx * sx + ny * ny;
  if (r2 >= radius * radius) return 0;
  const z = Math.sqrt(1 - r2);
  const light = clamp(0.18 + z * 0.52 + (-sx - ny) * 0.2);
  const rim = smoothstep(radius * 0.92, radius, Math.sqrt(r2)) * 0.42;
  return clamp(light + rim);
};

/**
 * Rect that contains an image of `imageAspect` inside a cols x rows grid,
 * with a little breathing room. Values are in cell units.
 */
export const coverRect = (cols: number, rows: number, imageAspect: number, inset = 0.06) => {
  const availableW = cols * (1 - inset * 2);
  const availableH = rows * (1 - inset * 2);
  let w = availableW;
  let h = w / imageAspect;
  if (h > availableH) {
    h = availableH;
    w = h * imageAspect;
  }
  return {
    x: (cols - w) / 2,
    y: (rows - h) / 2,
    w,
    h,
  };
};

/** Alpha field sampled from an image's alpha channel into a grid. */
export const sampleAlphaGrid = (
  data: Uint8ClampedArray,
  width: number,
  height: number,
  cols: number,
  rows: number,
  rect: { x: number; y: number; w: number; h: number },
): Float32Array => {
  const field = new Float32Array(cols * rows);
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const u = rect.x + ((x + 0.5) / cols) * rect.w;
      const v = rect.y + ((y + 0.5) / rows) * rect.h;
      const px = Math.round((u / cols) * width);
      const py = Math.round((v / rows) * height);
      let alpha = 0;
      for (let oy = -1; oy <= 1; oy += 1) {
        for (let ox = -1; ox <= 1; ox += 1) {
          const sx = Math.min(width - 1, Math.max(0, px + ox));
          const sy = Math.min(height - 1, Math.max(0, py + oy));
          alpha = Math.max(alpha, data[(sy * width + sx) * 4 + 3] ?? 0);
        }
      }
      field[y * cols + x] = alpha / 255;
    }
  }
  return field;
};
