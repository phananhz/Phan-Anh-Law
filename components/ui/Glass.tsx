'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the refraction layer so navigation can keep SSR stable.
const LiquidGlassInternal = dynamic(() => import('liquid-glass-react'), {
  ssr: false,
});

export type GlassVariant =
  | 'subtle'
  | 'navigation'
  | 'card'
  | 'floating'
  | 'button'
  | 'prominent';

interface GlassProps {
  children: React.ReactNode;
  variant?: GlassVariant;
  className?: string;
  style?: React.CSSProperties;
  isDark?: boolean;
  cornerRadius?: number;
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  elasticity?: number;
  onClick?: () => void;
  mouseContainer?: React.RefObject<HTMLElement | null> | null;
  role?: string;
  tabIndex?: number;
  ariaLabel?: string;
}

interface VariantConfig {
  displacementScale: number;
  blurAmount: number;
  saturation: number;
  aberrationIntensity: number;
  elasticity: number;
  cornerRadius: number;
  classes: string;
  darkClasses: string;
}

const variantConfigs: Record<GlassVariant, VariantConfig> = {
  subtle: {
    displacementScale: 30,
    blurAmount: 0.08,
    saturation: 110,
    aberrationIntensity: 0.5,
    elasticity: 0.08,
    cornerRadius: 16,
    classes:
      'backdrop-blur-md backdrop-saturate-125 bg-white/70 border border-stone-200/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),0_4px_12px_rgba(0,0,0,0.03)]',
    darkClasses:
      'backdrop-blur-md backdrop-saturate-125 bg-black/40 border border-white/15 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.3)]',
  },
  navigation: {
    displacementScale: 35,
    blurAmount: 0.12,
    saturation: 120,
    aberrationIntensity: 0.6,
    elasticity: 0.08,
    cornerRadius: 24,
    classes:
      'backdrop-blur-2xl backdrop-saturate-150 bg-white/15 border border-white/45 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.72),0_16px_40px_-10px_rgba(16,19,18,0.10)]',
    darkClasses:
      'backdrop-blur-2xl backdrop-saturate-150 bg-[#101312]/85 border border-white/15 text-white shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.15),0_20px_50px_rgba(0,0,0,0.5)]',
  },
  card: {
    displacementScale: 40,
    blurAmount: 0.10,
    saturation: 115,
    aberrationIntensity: 0.8,
    elasticity: 0.10,
    cornerRadius: 20,
    classes:
      'backdrop-blur-xl backdrop-saturate-125 bg-white/85 border border-stone-900/[0.07] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),0_12px_32px_-8px_rgba(16,19,18,0.06)]',
    darkClasses:
      'backdrop-blur-xl backdrop-saturate-125 bg-[#181C1B]/85 border border-white/10 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_16px_40px_rgba(0,0,0,0.4)]',
  },
  floating: {
    displacementScale: 45,
    blurAmount: 0.14,
    saturation: 125,
    aberrationIntensity: 0.9,
    elasticity: 0.12,
    cornerRadius: 24,
    classes:
      'backdrop-blur-2xl backdrop-saturate-150 bg-white/90 border border-stone-900/[0.08] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9),0_24px_60px_-12px_rgba(16,19,18,0.15)]',
    darkClasses:
      'backdrop-blur-2xl backdrop-saturate-150 bg-[#101312]/90 border border-white/20 text-white shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2),0_24px_60px_rgba(0,0,0,0.6)]',
  },
  button: {
    displacementScale: 35,
    blurAmount: 0.09,
    saturation: 120,
    aberrationIntensity: 0.8,
    elasticity: 0.16,
    cornerRadius: 9999,
    classes:
      'backdrop-blur-lg bg-[#153E35] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0_8px_20px_-4px_rgba(21,62,53,0.35)] hover:bg-[#0E2923] active:scale-[0.98]',
    darkClasses:
      'backdrop-blur-lg bg-white/15 text-white border border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_8px_20px_rgba(0,0,0,0.4)] hover:bg-white/25 active:scale-[0.98]',
  },
  prominent: {
    displacementScale: 48,
    blurAmount: 0.14,
    saturation: 130,
    aberrationIntensity: 1.1,
    elasticity: 0.14,
    cornerRadius: 24,
    classes:
      'backdrop-blur-2xl backdrop-saturate-150 bg-white/95 border border-stone-900/[0.12] shadow-[inset_0_1px_1px_0_rgba(255,255,255,1),0_30px_70px_-15px_rgba(16,19,18,0.2)]',
    darkClasses:
      'backdrop-blur-2xl backdrop-saturate-150 bg-[#101312]/95 border border-white/20 text-white shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25),0_30px_70px_rgba(0,0,0,0.7)]',
  },
};

export default function Glass({
  children,
  variant = 'card',
  className = '',
  style,
  isDark = false,
  cornerRadius,
  displacementScale,
  blurAmount,
  saturation,
  aberrationIntensity,
  elasticity,
  onClick,
  mouseContainer,
  role,
  tabIndex,
  ariaLabel,
}: GlassProps) {
  const [mounted, setMounted] = useState(false);
  const [useLiquidGlass, setUseLiquidGlass] = useState(false);

  const config = variantConfigs[variant];
  const actualCorner = cornerRadius ?? config.cornerRadius;

  useEffect(() => {
    setMounted(true);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Keep the physics layer on compact controls. Full-width navigation uses the
    // CSS glass surface below because the package's intrinsic pill shell adds
    // an extra layout box around wide navigation bars.
    if (variant === 'button' && !prefersReducedMotion && !isMobile) {
      setUseLiquidGlass(true);
    }
  }, [variant]);

  const activeClasses = isDark ? config.darkClasses : config.classes;

  // Real liquid-glass refraction for the navigation and interactive controls.
  if (mounted && useLiquidGlass && variant === 'button') {
    return (
      <div
        suppressHydrationWarning
        className={`relative inline-flex items-center justify-center overflow-hidden ${activeClasses} ${className}`}
        style={{
          borderRadius: `${actualCorner}px`,
          ...style,
        }}
        onClick={onClick}
        role={role}
        tabIndex={tabIndex}
        aria-label={ariaLabel}
      >
        <LiquidGlassInternal
          displacementScale={displacementScale ?? config.displacementScale}
          blurAmount={blurAmount ?? config.blurAmount}
          saturation={saturation ?? config.saturation}
          aberrationIntensity={aberrationIntensity ?? config.aberrationIntensity}
          elasticity={elasticity ?? config.elasticity}
          cornerRadius={actualCorner}
          padding="0px"
          overLight={!isDark}
          mode="standard"
          mouseContainer={mouseContainer}
          style={{
            position: 'relative',
            top: '0px',
            left: '0px',
            transform: 'none',
            borderRadius: `${actualCorner}px`,
          }}
        >
          {children}
        </LiquidGlassInternal>
      </div>
    );
  }

  // Apple-inspired restrained Liquid Glass surface with specular highlights and refractive blur
  return (
    <div
      suppressHydrationWarning
      className={`relative transition-all duration-300 overflow-visible ${activeClasses} ${className}`}
      style={{
        borderRadius: `${actualCorner}px`,
        ...style,
      }}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
    >
      {/* Delicate specular top rim highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] opacity-70"
        style={{
          background: isDark
            ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)',
          borderRadius: `${actualCorner}px ${actualCorner}px 0 0`,
        }}
      />
      {children}
    </div>
  );
}
