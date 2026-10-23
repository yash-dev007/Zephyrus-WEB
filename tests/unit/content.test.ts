import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { capabilities, capabilityGroups } from '@/data/capabilities';
import { installMethods, firstBoot } from '@/data/install';
import { spineSteps, dataTree, requestTrace } from '@/data/spine';
import { site, links } from '@/data/site';
import { clamp, coverRect, glyphForDensity, hash2, sphereDensity } from '@/lib/sigil';

const root = process.cwd();

describe('site data', () => {
  it('pins the approved identity and launch facts', () => {
    expect(site.name).toBe('Zephyrus');
    expect(site.version).toBe('1.0.1');
    expect(site.license).toBe('AGPL-3.0');
    expect(site.port).toBe(7000);
    expect(site.title.length).toBeLessThanOrEqual(60);
    expect(site.description.length).toBeLessThanOrEqual(160);
  });

  it('points repository links at the default branch, master', () => {
    const blobLinks = Object.entries(links).filter(([, value]) => value.includes('/blob/'));
    expect(blobLinks.length).toBeGreaterThan(5);
    for (const [name, value] of blobLinks) {
      expect(value, name).toContain('/blob/master/');
      expect(value, name).not.toContain('/blob/main/');
    }
  });

  it('has exactly twelve capability rows in four balanced groups', () => {
    expect(capabilities).toHaveLength(12);
    expect(new Set(capabilities.map((row) => row.index)).size).toBe(12);
    expect(capabilities.map((row) => row.index)).toEqual(
      Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, '0')),
    );
    for (const group of capabilityGroups) {
      expect(capabilities.filter((row) => row.group === group.roman)).toHaveLength(3);
    }
  });

  it('ships three install paths and a first-boot note', () => {
    expect(installMethods.map((method) => method.id)).toEqual(['docker', 'native', 'windows']);
    for (const method of installMethods) {
      expect(method.commands.length).toBeGreaterThan(2);
      expect(method.commands.join(' ')).toContain('git clone');
      expect(method.commands.join(' ')).not.toContain('TODO');
    }
    expect(firstBoot).toContain('temporary password');
  });

  it('keeps the five spine layers and the data layout in order', () => {
    expect(spineSteps).toHaveLength(5);
    expect(spineSteps.map((step) => step.name)).toEqual([
      'Client',
      'Gate',
      'Routes',
      'Logic',
      'State',
    ]);
    expect(dataTree[0]?.[0]).toBe('data/');
    expect(dataTree.some(([entry]) => entry.trim() === 'app.db')).toBe(true);
    expect(requestTrace).toContain('text/event-stream');
  });
});

describe('asset budgets', () => {
  it('keeps the self-hosted font payload under 100 KB', () => {
    const directory = path.join(root, 'public/fonts');
    const bytes = fs
      .readdirSync(directory)
      .filter((file) => file.endsWith('.woff2'))
      .reduce((total, file) => total + fs.statSync(path.join(directory, file)).size, 0);
    expect(bytes).toBeLessThanOrEqual(100 * 1024);
  });

  it('keeps grain tiles under 20 KB', () => {
    const directory = path.join(root, 'public');
    const bytes = fs
      .readdirSync(directory)
      .filter((file) => file.startsWith('grain-') && file.endsWith('.webp'))
      .reduce((total, file) => total + fs.statSync(path.join(directory, file)).size, 0);
    expect(bytes).toBeGreaterThan(0);
    expect(bytes).toBeLessThanOrEqual(20 * 1024);
  });

  it('keeps the graded source photography in the repo, but out of public', () => {
    const images = [
      'lair-server.jpg',
      'hoard-desk.jpg',
      'ward-relief.jpg',
      'wind-corridor.jpg',
      'ward-eye.jpg',
      'scales-texture.jpg',
    ];
    for (const image of images) {
      expect(fs.existsSync(path.join(root, 'src/assets/images', image))).toBe(true);
      expect(fs.existsSync(path.join(root, 'public', image))).toBe(false);
    }
  });
});

describe('sigil helpers', () => {
  it('clamps and hashes deterministically', () => {
    expect(clamp(-1)).toBe(0);
    expect(clamp(2)).toBe(1);
    const first = hash2(3, 7, 2);
    expect(first).toBeGreaterThanOrEqual(0);
    expect(first).toBeLessThan(1);
    expect(hash2(3, 7, 2)).toBe(first);
    expect(glyphForDensity(0)).toBe(' ');
    expect(glyphForDensity(1)).toBe('@');
  });

  it('keeps the sphere circular and empty outside its radius', () => {
    const centre = sphereDensity(18, 22.5, 36, 45);
    expect(centre).toBeGreaterThan(0);
    expect(sphereDensity(0, 0, 36, 45)).toBe(0);
    expect(sphereDensity(35, 44, 36, 45)).toBe(0);
  });

  it('fits the mark inside the grid', () => {
    const rect = coverRect(36, 45, 464 / 512, 0.055);
    expect(rect.x).toBeGreaterThanOrEqual(0);
    expect(rect.y).toBeGreaterThanOrEqual(0);
    expect(rect.x + rect.w).toBeLessThanOrEqual(36);
    expect(rect.y + rect.h).toBeLessThanOrEqual(45);
  });
});
