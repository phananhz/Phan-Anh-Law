'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export type NavbarTheme = 'light' | 'dark';

const SAMPLE_POSITION = 0.55;
const SECTION_BUFFER = 8;

export default function useNavbarTheme(): NavbarTheme {
  const pathname = usePathname();
  const [theme, setTheme] = useState<NavbarTheme>('light');

  useEffect(() => {
    let frame = 0;

    const detect = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const header = document.querySelector<HTMLElement>('[data-site-header]');
        const headerRect = header?.getBoundingClientRect();
        if (!headerRect || headerRect.height === 0) return;

        // Sample the middle of the visible glass surface. This prevents a
        // one-pixel overlap at a section boundary from flipping the theme.
        const sampleY = headerRect.top + headerRect.height * SAMPLE_POSITION;
        const darkSections = Array.from(
          document.querySelectorAll<HTMLElement>('[data-nav-theme="dark"]'),
        ).filter((section) => !section.closest('[data-site-header]'));

        const overDarkSurface = darkSections.some((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= sampleY + SECTION_BUFFER && rect.bottom >= sampleY - SECTION_BUFFER;
        });

        const nextTheme: NavbarTheme = overDarkSurface ? 'dark' : 'light';
        setTheme((currentTheme) => (currentTheme === nextTheme ? currentTheme : nextTheme));
      });
    };

    const scheduleDetect = () => detect();

    detect();
    window.addEventListener('scroll', scheduleDetect, { passive: true });
    window.addEventListener('resize', scheduleDetect);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleDetect);
      window.removeEventListener('resize', scheduleDetect);
    };
  }, [pathname]);

  return theme;
}