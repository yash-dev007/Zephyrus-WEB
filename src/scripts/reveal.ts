const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

if (elements.length) {
  const root = document.documentElement;
  root.classList.add('reveal-ready');

  const reveal = (element: Element) => {
    element.classList.add('is-revealed');
  };

  if (!('IntersectionObserver' in window)) {
    elements.forEach(reveal);
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    elements.forEach((element) => observer.observe(element));

    // Content must never stay hidden if an observer misfires (for example
    // inside a browser's find-in-page scroll jump).
    window.setTimeout(() => {
      elements.forEach((element) => {
        if (!element.classList.contains('is-revealed')) reveal(element);
      });
      observer.disconnect();
    }, 4000);
  }
}
