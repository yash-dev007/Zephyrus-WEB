import { useEffect, useId, useRef, useState } from 'react';
import { links, nav, site } from '@/data/site';

const menuItems = [
  { label: 'Home', href: '/', index: '00' },
  ...nav.map((item, position) => ({
    label: item.label,
    href: item.href,
    index: String(position + 1).padStart(2, '0'),
  })),
  { label: 'Colophon', href: '/colophon', index: '06' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    const previousOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const inertTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.site-header .brand, .site-header .nav, .site-header .nav__cta, main, footer, .skip-link',
      ),
    );

    trigger?.setAttribute('aria-expanded', 'true');
    inertTargets.forEach((element) => element.setAttribute('inert', ''));
    trigger?.setAttribute('inert', '');
    document.documentElement.classList.add('menu-open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop();

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 40);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !sheetRef.current) return;
      const focusable = Array.from(
        sheetRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute('inert'));

      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !sheetRef.current.contains(active))) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    const desktop = window.matchMedia('(min-width: 1100px)');
    const onDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', onDesktop);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onDesktop);
      trigger?.setAttribute('aria-expanded', 'false');
      trigger?.removeAttribute('inert');
      inertTargets.forEach((element) => element.removeAttribute('inert'));
      document.documentElement.classList.remove('menu-open');
      document.documentElement.style.overflow = previousOverflow;
      document.body.style.overflow = previousBodyOverflow;
      window.__lenis?.start();
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="menu-button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="site-menu"
        data-ready={String(ready)}
        onClick={() => setOpen(true)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <div
        ref={sheetRef}
        id="site-menu"
        className="menu"
        role={open ? 'dialog' : undefined}
        aria-modal={open ? true : undefined}
        aria-hidden={open ? undefined : true}
        aria-labelledby={titleId}
        data-open={String(open)}
        inert={open ? undefined : true}
      >
        <div className="menu__top">
          <span className="brand" aria-hidden="true">
            <span className="brand__mark" />
            <span className="brand__word" />
          </span>
          <h2 id={titleId} className="visually-hidden">
            Site menu
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="menu__close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <span className="visually-hidden">Close</span>
          </button>
        </div>

        <nav className="menu__nav" aria-label="Mobile">
          {menuItems.map((item) => (
            <a
              key={item.href}
              className="menu__link"
              href={item.href}
              onClick={() => setOpen(false)}
            >
              <span>{item.label}</span>
              <span aria-hidden="true">{item.index}</span>
            </a>
          ))}
        </nav>

        <div className="menu__foot">
          <div>
            <div>
              v{site.version} / {site.license}
            </div>
            <a href={links.github} rel="noopener noreferrer">
              GitHub ↗
            </a>
          </div>
          <img
            className="menu__stamp"
            src="/brand/stamp.svg"
            alt=""
            width="82"
            height="82"
            aria-hidden="true"
          />
        </div>
      </div>
    </>
  );
}
