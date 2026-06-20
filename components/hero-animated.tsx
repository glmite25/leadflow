'use client';

import { useEffect, useRef } from 'react';

/**
 * Wraps hero children and applies staggered fade-in-up animations
 * using a lightweight IntersectionObserver + CSS approach.
 * No external animation library — just Tailwind + native browser APIs.
 */
export function HeroAnimated({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>('[data-animate]');

    items.forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`;
    });

    // Small timeout so initial styles are applied before triggering
    const timer = setTimeout(() => {
      items.forEach((item) => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      });
    }, 60);

    return () => clearTimeout(timer);
  }, []);

  return <div ref={ref}>{children}</div>;
}
