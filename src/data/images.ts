import lairServer from '@/assets/images/lair-server.jpg';
import hoardDesk from '@/assets/images/hoard-desk.jpg';
import wardRelief from '@/assets/images/ward-relief.jpg';
import windCorridor from '@/assets/images/wind-corridor.jpg';
import wardEye from '@/assets/images/ward-eye.jpg';
import scalesTexture from '@/assets/images/scales-texture.jpg';
import type { ImageMetadata } from 'astro';

export type SiteImage = {
  src: ImageMetadata;
  alt: string;
  caption: string;
  credit: string;
  position?: string;
};

export const images: Record<'lair' | 'hoard' | 'ward' | 'wind' | 'eye' | 'scales', SiteImage> = {
  lair: {
    src: lairServer,
    alt: 'A single black server rack in a bare concrete basement, lit by one cold status light.',
    caption: 'THE LAIR / 002',
    credit: 'Generated and graded for Zephyrus, 2026',
    position: 'center 46%',
  },
  hoard: {
    src: hoardDesk,
    alt: 'A dark workbench with a glowing CRT, stacked hard drives, a coiled cable, and a closed notebook.',
    caption: 'THE HOARD / FIELD NOTE 01',
    credit: 'Generated and graded for Zephyrus, 2026',
    position: 'center 54%',
  },
  ward: {
    src: wardRelief,
    alt: 'A weathered stone relief of a coiled dragon above a concrete doorway, lit by a raking light.',
    caption: 'THE WARD / 004',
    credit: 'Generated and graded for Zephyrus, 2026',
    position: 'center 42%',
  },
  wind: {
    src: windCorridor,
    alt: 'Wind pushes dust and a translucent sheet through a dark concrete corridor toward one distant light.',
    caption: 'THE WIND / 007',
    credit: 'Generated and graded for Zephyrus, 2026',
    position: 'center 50%',
  },
  eye: {
    src: wardEye,
    alt: 'A macro view of a reptilian eye with a pale ice-blue iris and a vertical pupil.',
    caption: 'THE WARD / WATCH',
    credit: 'Generated and graded for Zephyrus, 2026',
    position: 'center',
  },
  scales: {
    src: scalesTexture,
    alt: 'Overlapping blackened steel plates that resemble industrial scales.',
    caption: 'MATERIAL STUDY / SCALES',
    credit: 'Generated and graded for Zephyrus, 2026',
    position: 'center',
  },
};
