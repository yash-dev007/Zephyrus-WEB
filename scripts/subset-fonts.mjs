/**
 * Subset the three OFL families to the glyphs this site actually uses.
 * Run when copy changes: `node scripts/subset-fonts.mjs`.
 *
 * Archivo is display-only and always uppercased in CSS, so it carries no
 * lowercase glyphs. JetBrains Mono and Instrument Serif keep full ASCII.
 */
import fs from 'node:fs';
import path from 'node:path';
import subsetFont from 'subset-font';

const root = process.cwd();
const outDir = path.join(root, 'public/fonts');

const ascii = Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join('');
const symbols = '©®°±·–—…‘’“”×≥≤→←↑↓↗↘∶';

const fonts = [
  {
    input: 'node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2',
    output: 'archivo-var-latin.woff2',
    chars: `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,:;!?/&%+-–—·©®'"()[]#*×≥≤→←↑↓↗↘`,
  },
  {
    input:
      'node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2',
    output: 'jetbrains-mono-var-latin.woff2',
    chars: ascii + symbols,
  },
  {
    input:
      'node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2',
    output: 'instrument-serif-italic-latin.woff2',
    chars: ascii + symbols,
  },
];

fs.mkdirSync(outDir, { recursive: true });
let total = 0;
for (const font of fonts) {
  const buffer = fs.readFileSync(path.join(root, font.input));
  const subset = await subsetFont(buffer, font.chars, { targetFormat: 'woff2' });
  fs.writeFileSync(path.join(outDir, font.output), subset);
  total += subset.length;
  console.log(`${font.output}: ${(subset.length / 1024).toFixed(1)} KB`);
}
console.log(`total: ${(total / 1024).toFixed(1)} KB`);
