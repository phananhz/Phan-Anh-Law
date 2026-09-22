'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ChevronDown, Menu, ArrowRight } from 'lucide-react';
import Glass from '@/components/ui/Glass';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import SearchCommand from '@/components/ui/SearchCommand';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'practices' | 'industries' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll detection to adapt navbar size and opacity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnter = (menu: 'practices' | 'industries') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMegaMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 180);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 flex justify-center transition-all duration-300 pointer-events-none ${
          scrolled ? 'pt-2.5 sm:pt-3' : 'pt-4 sm:pt-6'
        } px-4 sm:px-6`}
      >
        <div className="w-full max-w-7xl pointer-events-auto">
          <Glass
            variant="navigation"
            cornerRadius={scrolled ? 20 : 24}
            className={`w-full transition-all duration-300 ${
              scrolled
                ? 'bg-white/20 shadow-glass-floating py-2.5 px-4 sm:px-6'
                : 'bg-white/10 shadow-glass-card py-3.5 px-5 sm:px-7'
            } border border-white/45`}
          >
            <div className="flex items-center justify-between">
              {/* Brand Logo */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-[#153E35] flex items-center justify-center text-white font-serif font-bold text-base tracking-wider shadow-sm transition-transform group-hover:scale-105">
                  PA
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-lg tracking-tight text-stone-900 leading-none group-hover:text-emerald-brand transition-colors">
                    PHAN ANH
                  </span>
                  <span className="text-[9px] tracking-[0.25em] uppercase text-stone-500 font-medium">
                    Corporate Law
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-sm font-medium text-stone-700">
                {/* Lĩnh vực dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('practices')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-full transition-colors ${
                      activeMegaMenu === 'practices' || pathname.startsWith('/practices')
                        ? 'text-emerald-brand bg-stone-100/70 font-semibold'
                        : 'hover:text-stone-950 hover:bg-stone-100/50'
                    }`}
                  >
                    <span>Lĩnh vực</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeMegaMenu === 'practices' ? 'rotate-180 text-emerald-brand' : ''
                      }`}
                    />
                  </button>

                  {/* Mega Menu Dropdown */}
                  {activeMegaMenu === 'practices' && (
                    <div className="absolute top-full left-1/2 -translate-x-1/3 pt-3">
                      <MegaMenu
                        type="practices"
                        onClose={() => setActiveMegaMenu(null)}
                      />
                    </div>
                  )}
                </div>

                {/* Ngành nghề dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('industries')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-full transition-colors ${
                      activeMegaMenu === 'industries'
                        ? 'text-emerald-brand bg-stone-100/70 font-semibold'
                        : 'hover:text-stone-950 hover:bg-stone-100/50'
                    }`}
                  >
                    <span>Ngành nghề</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeMegaMenu === 'industries' ? 'rotate-180 text-emerald-brand' : ''
                      }`}
                    />
                  </button>

                  {activeMegaMenu === 'industries' && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                      <MegaMenu
                        type="industries"
                        onClose={() => setActiveMegaMenu(null)}
                      />
                    </div>
                  )}
                </div>

                {/* Chuyên gia */}
                <Link
                  href="/people"
                  className={`px-3 py-2 rounded-full transition-colors ${
                    pathname.startsWith('/people')
                      ? 'text-emerald-brand bg-stone-100/70 font-semibold'
                      : 'hover:text-stone-950 hover:bg-stone-100/50'
                  }`}
                >
                  Chuyên gia
                </Link>

                {/* Góc pháp lý */}
                <Link
                  href="/insights"
                  className={`px-3 py-2 rounded-full transition-colors ${
                    pathname.startsWith('/insights')
                      ? 'text-emerald-brand bg-stone-100/70 font-semibold'
                      : 'hover:text-stone-950 hover:bg-stone-100/50'
                  }`}
                >
                  Góc pháp lý
                </Link>

                {/* Về chúng tôi */}
                <Link
                  href="/about"
                  className={`px-3 py-2 rounded-full transition-colors ${
                    pathname === '/about'
                      ? 'text-emerald-brand bg-stone-100/70 font-semibold'
                      : 'hover:text-stone-950 hover:bg-stone-100/50'
                  }`}
                >
                  Về chúng tôi
                </Link>
              </nav>

              {/* Action Buttons: Search + Contact CTA */}
              <div className="flex items-center gap-2.5">
                {/* Search Trigger */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100/70 transition-colors text-xs font-medium"
                  aria-label="Tìm kiếm nội dung"
                >
                  <Search className="w-4 h-4 text-stone-500" />
                  <span className="hidden xl:inline">Tìm kiếm</span>
                  <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-stone-400 bg-stone-200/50 rounded border border-stone-300/60">
                    ⌘K
                  </kbd>
                </button>

                {/* Consultation CTA */}
                <Link
                  href="/contact"
                  className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#153E35] text-white text-xs font-medium tracking-tight shadow-md hover:bg-[#0E2923] hover:shadow-lg active:scale-98 transition-all"
                >
                  <span>Liên hệ tư vấn</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
                  aria-label="Mở menu điều hướng"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Glass>
        </div>
      </header>

      {/* Global Command Palette */}
      <SearchCommand isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenSearch={() => setSearchOpen(true)}
      />
    </>
  );
}
