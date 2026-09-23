'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ChevronDown, Menu, ArrowRight } from 'lucide-react';
import Glass from '@/components/ui/Glass';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import SearchCommand from '@/components/ui/SearchCommand';
import useNavbarTheme from './useNavbarTheme';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'practices' | 'industries' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navTheme = useNavbarTheme();

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

  useEffect(() => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);
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
      <header data-site-header data-nav-theme={navTheme} className={`fixed top-0 left-0 right-0 z-40 flex justify-center transition-all duration-300 pointer-events-none ${
          scrolled ? 'pt-2.5 sm:pt-3' : 'pt-4 sm:pt-6'
        } px-4 sm:px-6`}
      >
        <div className="w-full max-w-7xl pointer-events-auto">
          <Glass
            variant="navigation"
            isDark={navTheme === 'dark'}
            cornerRadius={scrolled ? 20 : 24}
            className={`navbar-glass w-full transition-all duration-300 ${
              scrolled
                ? 'shadow-glass-floating py-2.5 px-4 sm:px-6'
                : 'shadow-glass-card py-3.5 px-5 sm:px-7'
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Brand Logo */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="navbar-brand-mark w-8 h-8 rounded-lg flex items-center justify-center font-serif font-bold text-base tracking-wider shadow-sm transition-transform group-hover:scale-105">
                  PA
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-lg tracking-tight navbar-brand-primary leading-none transition-colors">
                    PHAN ANH
                  </span>
                  <span className="text-[9px] tracking-[0.25em] navbar-brand-secondary uppercase font-medium">
                    Corporate Law
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <nav className="navbar-links hidden lg:flex items-center gap-1.5 xl:gap-2 text-sm font-medium">
                {/* Lĩnh vực dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('practices')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-full transition-colors ${
                      activeMegaMenu === 'practices' || pathname.startsWith('/practices')
                        ? 'navbar-item-active font-semibold'
                        : ''
                    }`}
                  >
                    <span>Lĩnh vực</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeMegaMenu === 'practices' ? 'rotate-180' : ''
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
                        ? 'navbar-item-active font-semibold'
                        : ''
                    }`}
                  >
                    <span>Ngành nghề</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeMegaMenu === 'industries' ? 'rotate-180' : ''
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
                      ? 'navbar-item-active font-semibold'
                      : ''
                  }`}
                >
                  Chuyên gia
                </Link>

                {/* Góc pháp lý */}
                <Link
                  href="/insights"
                  className={`px-3 py-2 rounded-full transition-colors ${
                    pathname.startsWith('/insights')
                      ? 'navbar-item-active font-semibold'
                      : ''
                  }`}
                >
                  Góc pháp lý
                </Link>

                {/* Về chúng tôi */}
                <Link
                  href="/news"
                  className="px-3 py-2 rounded-full transition-colors"
                >
                  Tin tức
                </Link>
                <Link
                  href="/about"
                  className={`px-3 py-2 rounded-full transition-colors ${
                    pathname === '/about'
                      ? 'navbar-item-active font-semibold'
                      : ''
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
                  className="navbar-search flex items-center gap-2 px-3 py-2 rounded-full transition-colors text-xs font-medium"
                  aria-label="Tìm kiếm nội dung"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden xl:inline">Tìm kiếm</span>
                </button>

                {/* Consultation CTA */}
                <Link
                  href="/contact"
                  className="navbar-cta hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium tracking-tight shadow-md active:scale-98 transition-all"
                >
                  <span>Liên hệ tư vấn</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="navbar-mobile-toggle lg:hidden p-2 rounded-full transition-colors"
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
