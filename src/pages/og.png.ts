import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { site } from '@/data/site';

export const prerender = true;

type Node = { type: string; props: Record<string, unknown> };

const el = (
  type: string,
  style: Record<string, unknown>,
  children?: unknown,
  props: Record<string, unknown> = {},
): Node => ({
  type,
  props: { style, children, ...props },
});

const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
  return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
};

const asciiRows = (() => {
  const random = mulberry32(0x5a455048);
  const glyphs = ' .:-=+*#';
  const rows: string[] = [];
  for (let row = 0; row < 38; row += 1) {
    let line = '';
    for (let column = 0; column < 24; column += 1) {
      line += glyphs[Math.floor(random() * glyphs.length)];
    }
    rows.push(line);
  }
  return rows.join('\n');
})();

let cached: Buffer | null = null;

export const GET: APIRoute = async () => {
  if (cached) {
    return new Response(new Uint8Array(cached), {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  const [archivo, mono, mark, grainSource] = await Promise.all([
    fs.readFile(path.join(process.cwd(), 'public/fonts/archivo-var-latin.woff2')),
    fs.readFile(path.join(process.cwd(), 'public/fonts/jetbrains-mono-var-latin.woff2')),
    fs.readFile(path.join(process.cwd(), 'public/brand/mark-bone.svg')),
    fs.readFile(path.join(process.cwd(), 'public/grain-fine.webp')),
  ]);

  const markUri = `data:image/svg+xml;base64,${mark.toString('base64')}`;
  const grain = await sharp(grainSource).png().toBuffer();
  const grainUri = `data:image/png;base64,${grain.toString('base64')}`;

  const tree = el(
    'div',
    {
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      backgroundColor: '#0A0A0B',
      color: '#F2F2F0',
      padding: '54px 58px 46px',
      overflow: 'hidden',
    },
    [
      el(
        'div',
        {
          position: 'absolute',
          top: '0',
          right: '0',
          width: '520px',
          height: '630px',
          display: 'flex',
          justifyContent: 'flex-end',
          paddingTop: '32px',
          paddingRight: '22px',
          opacity: 0.075,
          fontFamily: 'JetBrains Mono',
          fontSize: '12px',
          lineHeight: 1.18,
          letterSpacing: '1px',
          color: '#F2F2F0',
          whiteSpace: 'pre',
        },
        asciiRows,
      ),
      el('div', {
        position: 'absolute',
        top: '24px',
        right: '24px',
        bottom: '24px',
        left: '24px',
        border: '1px solid rgba(242,242,240,0.13)',
      }),
      el('div', {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '1200px',
        height: '630px',
        backgroundImage: `url(${grainUri})`,
        backgroundRepeat: 'repeat',
        opacity: 0.05,
      }),

      // Top ledger line
      el(
        'div',
        {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '1084px',
          fontFamily: 'JetBrains Mono',
          fontSize: '10px',
          letterSpacing: '2px',
          color: 'rgba(242,242,240,0.46)',
          textTransform: 'uppercase',
          zIndex: 2,
        },
        [
          el('span', {}, 'Zephyrus / the wyrm in the machine'),
          el('span', {}, `Edition ${site.edition}`),
        ],
      ),

      // Main field
      el(
        'div',
        {
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          width: '1084px',
          marginTop: '18px',
          marginBottom: '10px',
          zIndex: 2,
        },
        [
          el(
            'div',
            {
              display: 'flex',
              flexDirection: 'column',
              width: '360px',
              flexShrink: 0,
            },
            [
              el(
                'img',
                {
                  width: '206px',
                  height: '227px',
                  objectFit: 'contain',
                  objectPosition: 'left center',
                },
                undefined,
                { src: markUri },
              ),
              el(
                'div',
                {
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '18px',
                },
                [
                  el(
                    'span',
                    {
                      fontFamily: 'Archivo',
                      fontWeight: 600,
                      fontSize: '43px',
                      lineHeight: 0.9,
                      letterSpacing: '1.5px',
                    },
                    'ZEPHYRUS',
                  ),
                  el(
                    'span',
                    {
                      marginTop: '12px',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '9px',
                      letterSpacing: '2.2px',
                      color: 'rgba(242,242,240,0.5)',
                      textTransform: 'uppercase',
                    },
                    'Local-first AI harness',
                  ),
                ],
              ),
            ],
          ),

          el('div', {
            width: '1px',
            height: '330px',
            backgroundColor: 'rgba(242,242,240,0.15)',
            marginLeft: '34px',
            marginRight: '42px',
          }),

          el(
            'div',
            {
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              alignItems: 'flex-start',
            },
            [
              el(
                'span',
                {
                  padding: '5px 8px',
                  border: '1px solid rgba(242,242,240,0.32)',
                  color: '#F2F2F0',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '9px',
                  letterSpacing: '1.6px',
                  textTransform: 'uppercase',
                },
                'The harness / v1.0.1 / AGPL-3.0',
              ),
              el(
                'div',
                {
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '24px',
                  fontFamily: 'Archivo',
                  fontWeight: 600,
                  fontSize: '56px',
                  lineHeight: 0.94,
                  letterSpacing: '-0.4px',
                  textTransform: 'uppercase',
                },
                [
                  el('div', { display: 'flex' }, 'YOUR MODELS.'),
                  el('div', { display: 'flex' }, 'YOUR MACHINE.'),
                  el('div', { display: 'flex' }, 'YOUR HOARD.'),
                ],
              ),
              el(
                'span',
                {
                  marginTop: '24px',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '11px',
                  letterSpacing: '1.15px',
                  color: 'rgba(242,242,240,0.62)',
                  textTransform: 'uppercase',
                },
                'Agent loops · memory · RAG · MCP · local serving',
              ),
            ],
          ),
        ],
      ),

      // Bottom ledger line
      el(
        'div',
        {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          width: '1084px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(242,242,240,0.15)',
          fontFamily: 'JetBrains Mono',
          fontSize: '9.5px',
          letterSpacing: '1.7px',
          color: 'rgba(242,242,240,0.48)',
          textTransform: 'uppercase',
          zIndex: 2,
        },
        [
          el('span', {}, 'One FastAPI server / one data directory / no hosted account'),
          el('span', { color: '#F2F2F0' }, 'localhost:7000'),
        ],
      ),
    ],
  );

  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Archivo', data: archivo, weight: 600, style: 'normal' },
      { name: 'Archivo', data: archivo, weight: 500, style: 'normal' },
      { name: 'JetBrains Mono', data: mono, weight: 400, style: 'normal' },
    ],
  });

  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  })
    .render()
    .asPng();

  cached = Buffer.from(png);

  return new Response(new Uint8Array(cached), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
