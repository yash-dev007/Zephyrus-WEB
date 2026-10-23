/**
 * Generate the two static grain tiles used by the site.
 * Fine: 128px per-pixel noise. Coarse: 256px low-frequency noise.
 * Both are grayscale WebP, pointer-events: none, aria-hidden when used.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import sharp from 'sharp';

const root = process.cwd();
fs.mkdirSync(`${root}/public`, { recursive: true });

const make = (size, blur, contrast, quality) => {
  const px = Buffer.alloc(size * size);
  crypto.randomFillSync(px);
  return sharp(px, { raw: { width: size, height: size, channels: 1 } })
    .blur(blur)
    .linear(contrast, -128 * (contrast - 1))
    .webp({ quality, effort: 6 })
    .toBuffer();
};

const fine = await make(128, 0.3, 1.9, 60);
const coarse = await make(256, 7, 2.3, 65);
fs.writeFileSync(`${root}/public/grain-fine.webp`, fine);
fs.writeFileSync(`${root}/public/grain-coarse.webp`, coarse);
console.log(`grain-fine.webp ${(fine.length / 1024).toFixed(1)} KB`);
console.log(`grain-coarse.webp ${(coarse.length / 1024).toFixed(1)} KB`);
