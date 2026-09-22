import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  description?: string;
  isDark?: boolean;
  align?: 'left' | 'center' | 'split';
  className?: string;
  action?: React.ReactNode;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  isDark = false,
  align = 'left',
  className = '',
  action,
}: SectionHeadingProps) {
  if (align === 'split') {
    return (
      <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 ${className}`}>
        <div className="max-w-2xl">
          {eyebrow && (
            <div
              className={`text-xs font-semibold tracking-[0.2em] uppercase mb-4 ${
                isDark ? 'text-sage-brand' : 'text-emerald-brand'
              }`}
            >
              {eyebrow}
            </div>
          )}
          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.15] ${
              isDark ? 'text-white' : 'text-[#111111]'
            }`}
          >
            {title}
          </h2>
        </div>
        {(description || action) && (
          <div className="lg:max-w-md flex flex-col items-start lg:items-end gap-4">
            {description && (
              <p
                className={`text-base leading-relaxed ${
                  isDark ? 'text-stone-400' : 'text-stone-600'
                }`}
              >
                {description}
              </p>
            )}
            {action}
          </div>
        )}
      </div>
    );
  }

  const isCenter = align === 'center';

  return (
    <div
      className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : ''} pb-10 sm:pb-14 ${className}`}
    >
      {eyebrow && (
        <div
          className={`text-xs font-semibold tracking-[0.2em] uppercase mb-3 ${
            isDark ? 'text-sage-brand' : 'text-emerald-brand'
          }`}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.15] mb-5 ${
          isDark ? 'text-white' : 'text-[#111111]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-stone-400' : 'text-stone-600'
          }`}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
