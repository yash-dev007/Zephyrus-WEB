const header = document.querySelector<HTMLElement>('[data-site-header]');
const progress = document.querySelector<HTMLElement>('[data-scroll-progress]');
const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-section]'));
const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-id]'));

let frame = 0;

const update = () => {
  frame = 0;
  const scrollY = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;

  header?.setAttribute('data-scrolled', String(scrollY > 24));
  document.documentElement.style.setProperty('--scroll-progress', ratio.toFixed(4));

  if (progress) {
    progress.setAttribute('aria-hidden', 'true');
  }

  if (!sections.length || !navLinks.length) return;

  const line = (header?.getBoundingClientRect().height ?? 64) + 120;
  let current: string | null = null;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= line) {
      current = section.dataset.navSection ?? null;
    }
  }

  for (const link of navLinks) {
    link.setAttribute('data-active', String(link.dataset.navId === current));
  }
};

const schedule = () => {
  if (frame) return;
  frame = window.requestAnimationFrame(update);
};

window.addEventListener('scroll', schedule, { passive: true });
window.addEventListener('resize', schedule);
update();
