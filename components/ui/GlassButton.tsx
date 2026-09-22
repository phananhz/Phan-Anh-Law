'use client';

import React from 'react';
import Link from 'next/link';
import Glass from './Glass';

interface GlassButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'dark' | 'outline';
  className?: string;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function GlassButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  icon,
  type = 'button',
  disabled = false,
}: GlassButtonProps) {
  const isPrimary = variant === 'primary';
  const isDark = variant === 'dark';

  const baseStyles =
    'group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-medium tracking-tight rounded-full transition-all duration-300 select-none';

  const variantStyles = {
    primary:
      'bg-[#153E35] text-white hover:bg-[#0E2923] shadow-md hover:shadow-lg border border-emerald-800/40',
    secondary:
      'bg-white/80 text-[#111111] hover:bg-white border border-stone-900/10 shadow-sm hover:shadow',
    dark:
      'bg-stone-900/90 text-white hover:bg-stone-950 border border-white/10 shadow-lg',
    outline:
      'bg-transparent text-[#111111] border border-stone-900/20 hover:border-stone-900/50 hover:bg-black/[0.02]',
  };

  const content = (
    <span className="flex items-center gap-2">
      <span>{children}</span>
      {icon && (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      {content}
    </button>
  );
}
