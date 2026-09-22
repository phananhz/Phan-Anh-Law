import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F4F3EF',
          alt: '#ECEAE4',
          subtle: '#F9F8F5',
        },
        ink: {
          DEFAULT: '#111111',
          secondary: '#62625E',
          muted: '#8A8A85',
          faint: '#BCBCB7',
        },
        obsidian: {
          DEFAULT: '#101312',
          light: '#181C1B',
          surface: '#1F2422',
        },
        emerald: {
          brand: '#153E35',
          deep: '#0E2923',
          tint: '#1C5045',
          light: '#E6EFEA',
        },
        sage: {
          brand: '#A4B8A7',
          light: '#D3DDD4',
          faint: '#EDF2EE',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Newsreader', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      maxWidth: {
        'site': '1440px',
        'reading': '780px',
        'editorial': '860px',
      },
      borderRadius: {
        'glass-sm': '14px',
        'glass': '20px',
        'glass-lg': '26px',
        'glass-full': '9999px',
      },
      boxShadow: {
        'glass-subtle': '0 8px 32px 0 rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.4)',
        'glass-card': '0 16px 40px -8px rgba(16, 19, 18, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
        'glass-floating': '0 24px 60px -12px rgba(16, 19, 18, 0.14), 0 0 0 1px rgba(20, 20, 20, 0.06)',
        'glass-dark': '0 20px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        'glass': '16px',
        'glass-heavy': '24px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
