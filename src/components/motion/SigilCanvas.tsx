import { useCallback, useEffect, useRef, useState } from 'react';
import {
  coverRect,
  glyphForDensity,
  hash2,
  sampleAlphaGrid,
  smoothstep,
  sphereDensity,
} from '@/lib/sigil';

const DEFAULT_COLS = 36;
const DEFAULT_ROWS = 45;
const HOVER_COLS = 44;
const HOVER_ROWS = 55;

const RESOLVE_MS = 900;
const HOLD_MS = 650;
const MORPH_MS = 1600;

type Grid = {
  cols: number;
  rows: number;
  sphere: Float32Array;
  mark: Float32Array;
};

type Runtime = {
  ctx: CanvasRenderingContext2D | null;
  width: number;
  height: number;
  dpr: number;
  markData: Uint8ClampedArray | null;
  markWidth: number;
  markHeight: number;
  markAspect: number;
  grids: Map<string, Grid>;
  hover: boolean;
  startedAt: number;
  reduced: boolean;
  visible: boolean;
  interval: ReturnType<typeof setInterval> | null;
  stirUntil: number;
  stirSeed: number;
  pointerX: number;
  pointerY: number;
  targetX: number;
  targetY: number;
};

const buildSphere = (cols: number, rows: number) => {
  const field = new Float32Array(cols * rows);
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      field[y * cols + x] = sphereDensity(x, y, cols, rows);
    }
  }
  return field;
};

const buildMark = (
  data: Uint8ClampedArray,
  width: number,
  height: number,
  imageAspect: number,
  cols: number,
  rows: number,
) => sampleAlphaGrid(data, width, height, cols, rows, coverRect(cols, rows, imageAspect, 0.055));

const gridKey = (cols: number, rows: number) => `${cols}x${rows}`;

export default function SigilCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const runtime = useRef<Runtime>({
    ctx: null,
    width: 0,
    height: 0,
    dpr: 1,
    markData: null,
    markWidth: 0,
    markHeight: 0,
    markAspect: 464 / 512,
    grids: new Map(),
    hover: false,
    startedAt: 0,
    reduced: false,
    visible: true,
    interval: null,
    stirUntil: 0,
    stirSeed: 0,
    pointerX: 0,
    pointerY: 0,
    targetX: 0,
    targetY: 0,
  });

  const getGrid = useCallback((cols: number, rows: number): Grid => {
    const rt = runtime.current;
    const key = gridKey(cols, rows);
    const existing = rt.grids.get(key);
    if (existing) return existing;
    const sphere = buildSphere(cols, rows);
    const mark = rt.markData
      ? buildMark(rt.markData, rt.markWidth, rt.markHeight, rt.markAspect, cols, rows)
      : new Float32Array(cols * rows);
    const grid = { cols, rows, sphere, mark };
    rt.grids.set(key, grid);
    return grid;
  }, []);

  const draw = useCallback(() => {
    const rt = runtime.current;
    const canvas = canvasRef.current;
    if (!canvas || !rt.ctx || rt.width === 0 || rt.height === 0) return;

    const { ctx } = rt;
    const cols = rt.hover ? HOVER_COLS : DEFAULT_COLS;
    const rows = rt.hover ? HOVER_ROWS : DEFAULT_ROWS;
    const grid = getGrid(cols, rows);
    const now = performance.now();
    const elapsed = rt.reduced ? Number.POSITIVE_INFINITY : now - rt.startedAt;

    let phase: 'resolve' | 'sphere' | 'morph' | 'done';
    if (rt.reduced || elapsed > RESOLVE_MS + HOLD_MS + MORPH_MS) phase = 'done';
    else if (elapsed > RESOLVE_MS + HOLD_MS) phase = 'morph';
    else if (elapsed > RESOLVE_MS) phase = 'sphere';
    else phase = 'resolve';

    ctx.clearRect(0, 0, rt.width, rt.height);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const cellW = rt.width / cols;
    const cellH = rt.height / rows;
    const fontSize = Math.max(7, Math.min(cellW, cellH) * 1.18);
    ctx.font = `500 ${fontSize.toFixed(2)}px "JetBrains Mono Variable", "JetBrains Mono", monospace`;

    const markRect = coverRect(cols, rows, rt.markAspect, 0.055);
    const eyeX = markRect.x + markRect.w * 0.2;
    const eyeY = markRect.y + markRect.h * 0.4;

    const offsetX = Math.round(rt.pointerX * 1.6);
    const offsetY = Math.round(rt.pointerY * 1.3);
    const stirring = now < rt.stirUntil;

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const sampleX = Math.min(cols - 1, Math.max(0, x - offsetX));
        const sampleY = Math.min(rows - 1, Math.max(0, y - offsetY));
        const index = sampleY * cols + sampleX;
        const sphere = grid.sphere[index] ?? 0;
        const mark = grid.mark[index] ?? 0;

        let density = 0;
        let active = false;
        let spark = false;

        if (phase === 'resolve') {
          const delay = hash2(x, y, 1) * 0.62;
          const reveal = smoothstep(delay, delay + 0.34, elapsed / RESOLVE_MS);
          active = sphere > 0.04 && reveal > 0.48;
          density = active ? sphere * (0.35 + reveal * 0.65) : 0;
          if (!active && reveal > 0.22 && hash2(x, y, 4) > 0.985) {
            active = true;
            density = 0.13;
            spark = true;
          }
        } else if (phase === 'sphere') {
          active = sphere > 0.035;
          density = sphere;
          if (hash2(x, y, 3) > 0.992) {
            active = true;
            density = 0.16;
            spark = true;
          }
        } else if (phase === 'morph') {
          const progress = smoothstep(0, 1, (elapsed - RESOLVE_MS - HOLD_MS) / MORPH_MS);
          const delay = hash2(x, y, 2) * 0.32;
          const local = smoothstep(delay, delay + 0.62, progress);
          if (local < 0.52) {
            active = sphere > 0.035;
            density = sphere * (1 - local * 0.65);
          } else {
            active = mark > 0.07;
            density = mark;
          }
          if (!active && local > 0.25 && local < 0.78 && hash2(x, y, 5) > 0.975) {
            active = true;
            density = 0.22;
            spark = true;
          }
        } else {
          active = mark > 0.07;
          density = mark;
          if (stirring) {
            const stir = hash2(x, y, rt.stirSeed) * 0.22;
            density = Math.max(0, density - stir * 0.12);
            if (hash2(x, y, rt.stirSeed + 9) > 0.972) {
              active = true;
              density = Math.max(density, 0.16);
              spark = true;
            }
          }
        }

        if (!active) {
          // A sparse field of technical dust keeps the plate from going blank.
          if (hash2(x, y, 8) > 0.955) {
            ctx.fillStyle = 'rgba(242, 242, 240, 0.055)';
            ctx.fillText(glyphForDensity(0.08), (x + 0.5) * cellW, (y + 0.5) * cellH);
          }
          continue;
        }

        const jitter = hash2(x, y, 6);
        const glyph = glyphForDensity(Math.min(1, density + jitter * 0.08));
        if (!glyph.trim()) continue;

        const eyeDistance = Math.hypot(x - eyeX, y - eyeY);
        const band = Math.abs((x + 0.5) / cols - 0.5) < 0.028;
        const accent =
          (phase === 'done' && eyeDistance < 1.15 && mark > 0.5) ||
          (band && mark > 0.35 && jitter > 0.66);

        if (accent) {
          ctx.fillStyle = `rgba(242, 242, 240, ${(0.42 + density * 0.45).toFixed(3)})`;
        } else if (spark) {
          ctx.fillStyle = `rgba(242, 242, 240, ${(0.14 + jitter * 0.1).toFixed(3)})`;
        } else {
          const alpha = 0.2 + density * 0.72;
          ctx.fillStyle = `rgba(242, 242, 240, ${alpha.toFixed(3)})`;
        }

        ctx.fillText(glyph, (x + 0.5) * cellW, (y + 0.5) * cellH);
      }
    }

    if (phase === 'done') {
      // The final frame is the one worth keeping; stop the timer.
      const rtNow = runtime.current;
      if (rtNow.interval) {
        clearInterval(rtNow.interval);
        rtNow.interval = null;
      }
    }
  }, [getGrid]);

  const startLoop = useCallback(() => {
    const rt = runtime.current;
    if (rt.interval || rt.reduced || !rt.visible || document.hidden) return;
    if (rt.startedAt === 0) rt.startedAt = performance.now();
    rt.interval = setInterval(draw, 83);
  }, [draw]);

  const stopLoop = useCallback(() => {
    const rt = runtime.current;
    if (rt.interval) {
      clearInterval(rt.interval);
      rt.interval = null;
    }
  }, []);

  const stir = useCallback(() => {
    const rt = runtime.current;
    rt.stirSeed = Math.floor(performance.now() / 100) % 10000;
    rt.stirUntil = performance.now() + 520;
    if (rt.interval) return;
    if (rt.reduced) {
      draw();
      return;
    }
    draw();
    rt.interval = setInterval(draw, 83);
    window.setTimeout(() => {
      if (performance.now() >= rt.stirUntil) {
        draw();
        stopLoop();
      }
    }, 560);
  }, [draw, stopLoop]);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const rt = runtime.current;
    rt.ctx = canvas.getContext('2d', { alpha: true });
    if (!rt.ctx) {
      setFailed(true);
      return;
    }

    rt.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    rt.startedAt = performance.now();

    const resize = () => {
      const rect = host.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      rt.width = rect.width;
      rt.height = rect.height;
      rt.dpr = dpr;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      rt.ctx = canvas.getContext('2d', { alpha: true });
      if (!rt.ctx) {
        setFailed(true);
        return;
      }
      rt.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rt.grids.clear();
      if (rt.markData) {
        getGrid(rt.hover ? HOVER_COLS : DEFAULT_COLS, rt.hover ? HOVER_ROWS : DEFAULT_ROWS);
      }
      draw();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    // Draw a sphere immediately while the mark loads.
    setReady(true);
    draw();
    if (!rt.reduced) startLoop();

    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      const sampleCanvas = document.createElement('canvas');
      const sampleW = 360;
      const sampleH = 450;
      sampleCanvas.width = sampleW;
      sampleCanvas.height = sampleH;
      const sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });
      if (!sampleCtx) return;
      const targetH = sampleH * 0.9;
      const targetW = targetH * (image.naturalWidth / image.naturalHeight);
      const targetX = (sampleW - targetW) / 2;
      const targetY = (sampleH - targetH) / 2;
      sampleCtx.clearRect(0, 0, sampleW, sampleH);
      sampleCtx.drawImage(image, targetX, targetY, targetW, targetH);
      try {
        const data = sampleCtx.getImageData(0, 0, sampleW, sampleH).data;
        rt.markData = data;
        rt.markWidth = sampleW;
        rt.markHeight = sampleH;
        rt.markAspect = targetW / targetH;
        rt.grids.clear();
        draw();
      } catch {
        setFailed(true);
      }
    };
    image.onerror = () => {
      setFailed(true);
    };
    image.src = '/brand/mark.svg';

    const onVisibility = () => {
      if (document.hidden) stopLoop();
      else if (rt.visible && !rt.reduced) {
        draw();
        if (
          rt.startedAt > 0 &&
          performance.now() - rt.startedAt < RESOLVE_MS + HOLD_MS + MORPH_MS
        ) {
          startLoop();
        }
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        rt.visible = Boolean(entry?.isIntersecting);
        if (rt.visible) {
          draw();
          if (!rt.reduced && performance.now() - rt.startedAt < RESOLVE_MS + HOLD_MS + MORPH_MS) {
            startLoop();
          }
        } else {
          stopLoop();
        }
      },
      { rootMargin: '120px' },
    );
    io.observe(host);

    const onFonts = () => draw();
    void document.fonts.ready.then(onFonts).catch(() => undefined);

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [draw, getGrid, startLoop, stopLoop]);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rt = runtime.current;
    if (rt.reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rt.targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    rt.targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    rt.pointerX += (rt.targetX - rt.pointerX) * 0.35;
    rt.pointerY += (rt.targetY - rt.pointerY) * 0.35;
    stir();
  };

  const onPointerEnter = () => {
    const rt = runtime.current;
    if (rt.reduced) return;
    if (!rt.hover) {
      rt.hover = true;
      draw();
    }
    stir();
  };

  const onPointerLeave = () => {
    const rt = runtime.current;
    rt.pointerX = 0;
    rt.pointerY = 0;
    if (!rt.reduced && rt.hover) {
      rt.hover = false;
      draw();
    }
  };

  return (
    <div
      className="sigil"
      ref={hostRef}
      data-canvas={ready && !failed}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div className="sigil__fallback" aria-hidden="true">
        <img src="/brand/mark-bone.svg" alt="" width="464" height="512" />
      </div>
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="sigil__scan" aria-hidden="true" />
      <div className="sigil__vignette" aria-hidden="true" />
    </div>
  );
}
