'use client';

import React, { useEffect, useState } from 'react';
import { ListOrdered } from 'lucide-react';

interface TOCItem {
  id: string;
  title: string;
  level: 2 | 3;
}

interface ArticleTOCProps {
  items: TOCItem[];
}

export default function ArticleTOC({ items }: ArticleTOCProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0% -60% 0%',
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <nav className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm" aria-label="Mục lục bài viết">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-stone-100 text-xs font-semibold uppercase tracking-wider text-stone-500">
        <ListOrdered className="w-3.5 h-3.5 text-emerald-brand" />
        <span>Mục lục bài viết</span>
      </div>

      <ul className="space-y-2 text-xs leading-relaxed">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              className={`${item.level === 3 ? 'pl-3' : ''}`}
            >
              <button
                onClick={() => scrollToHeading(item.id)}
                className={`text-left block transition-colors ${
                  isActive
                    ? 'font-semibold text-emerald-brand'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                {item.title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
