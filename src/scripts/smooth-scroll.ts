import Lenis from 'lenis';

const header = document.querySelector<HTMLElement>('[data-site-header]');
const headerOffset = () => (header?.getBoundingClientRect().height ?? 64) + 16;

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reducedData = window.matchMedia('(prefers-reduced-data: reduce)').matches;
const saveData = Boolean(navigator.connection?.saveData);
const shouldSmooth = !reducedMotion && !reducedData && !saveData;

if (shouldSmooth) {
  const lenis = new Lenis({
    lerp: 0.09,
    wheelMultiplier: 1,
    smoothWheel: true,
    syncTouch: false,
    anchors: false,
    autoRaf: true,
  });
  window.__lenis = lenis;
}

const focusTarget = (target: HTMLElement) => {
  if (!target.hasAttribute('tabindex')) {
    target.setAttribute('tabindex', '-1');
  }
  target.focus({ preventScroll: true });
};

const scrollToTarget = (target: HTMLElement, hash: string) => {
  if (window.__lenis) {
    window.__lenis.scrollTo(target, {
      offset: -headerOffset(),
      duration: 1.05,
      onComplete: () => {
        focusTarget(target);
        history.pushState(null, '', hash);
      },
    });
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset();
  window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
  focusTarget(target);
  history.pushState(null, '', hash);
};

document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href]');
  if (!link) return;
  if (link.target && link.target !== '_self') return;
  if (link.hasAttribute('download')) return;

  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin) return;
  if (url.pathname !== window.location.pathname) return;
  if (!url.hash || url.hash === '#') return;
  if (url.hash === window.location.hash) {
    event.preventDefault();
    const current = document.querySelector<HTMLElement>(url.hash);
    if (current) scrollToTarget(current, url.hash);
    return;
  }

  let target: HTMLElement | null = null;
  try {
    target = document.querySelector<HTMLElement>(url.hash);
  } catch {
    return;
  }
  if (!target) return;

  event.preventDefault();
  scrollToTarget(target, url.hash);
});

// A link from /colophon to /#anatomy lands with a hash. Keep the same
// focus contract once the browser has restored the position.
if (window.location.hash) {
  requestAnimationFrame(() => {
    try {
      const target = document.querySelector<HTMLElement>(window.location.hash);
      if (target) focusTarget(target);
    } catch {
      /* Invalid fragment: leave focus alone. */
    }
  });
}
