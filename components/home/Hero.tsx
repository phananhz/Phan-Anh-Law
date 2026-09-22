'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import Glass from '@/components/ui/Glass';
import GlassButton from '@/components/ui/GlassButton';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-between pt-32 sm:pt-40 pb-20 px-6 sm:px-8 overflow-hidden bg-[#F4F3EF]">
      {/* Architectural Background Pattern & Light Geometry */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 transition-transform duration-700 ease-out"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      >
        {/* Architectural grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,20,20,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,20,20,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
        
        {/* Soft atmospheric gradient spheres */}
        <div className="absolute -top-32 right-[-10%] w-[680px] h-[680px] rounded-full bg-gradient-to-br from-sage-light/30 via-emerald-light/20 to-transparent blur-3xl" />
        <div className="absolute top-[35%] -left-20 w-[540px] h-[540px] rounded-full bg-gradient-to-tr from-stone-200/40 via-sage-faint/30 to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Typography */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-stone-200/60 border border-stone-300/40 text-stone-700 text-xs tracking-wider uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand animate-pulse" />
              <span>Hãng luật Tư vấn Doanh nghiệp & Đầu tư</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-[82px] font-normal tracking-[-0.03em] leading-[1.05] text-[#111111]">
              LEGAL CLARITY <br />
              <span className="italic font-light text-stone-600">FOR A CHANGING</span> <br />
              BUSINESS WORLD.
            </h1>

            <div className="max-w-2xl space-y-3">
              <p className="text-xl sm:text-2xl font-serif text-stone-900 leading-snug">
                &ldquo;Tư vấn pháp lý, đầu tư và doanh nghiệp cho những quyết định quan trọng.&rdquo;
              </p>
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
                Chúng tôi kết hợp chuyên môn pháp lý với tư duy kinh doanh để giúp doanh nghiệp xử lý những vấn đề pháp lý phức tạp một cách rõ ràng và thực tiễn.
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <GlassButton
                href="/practices"
                variant="primary"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Khám phá lĩnh vực tư vấn
              </GlassButton>

              <GlassButton
                href="/contact"
                variant="secondary"
              >
                Trao đổi với chúng tôi →
              </GlassButton>
            </div>
          </div>

          {/* Strategic Single Floating LiquidGlass Panel */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm">
              <Glass
                variant="floating"
                cornerRadius={24}
                className="p-7 backdrop-blur-2xl bg-white/80 border border-stone-900/10 shadow-glass-floating"
              >
                <div className="flex items-center justify-between pb-5 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-brand text-white flex items-center justify-center font-serif text-xs">
                      PA
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                      Chuẩn mực tư vấn
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-brand bg-emerald-50 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Boutique Excellence
                  </span>
                </div>

                <div className="pt-5 space-y-4 text-sm text-stone-700">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-900/10 text-emerald-brand flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-900 text-sm">Chính xác & Dứt khoát</h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Không đưa ra các khuyến nghị chung chung. Chúng tôi xác định phương án hành động cụ thể.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-900/10 text-emerald-brand flex items-center justify-center shrink-0 mt-0.5">
                      <Compass className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-900 text-sm">Đồng hành Xuyên suốt</h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Từ cấu trúc giao dịch ban đầu đến đàm phán hợp đồng và xử lý thủ tục cấp phép thực tế.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium">Hà Nội & TP. Hồ Chí Minh</span>
                  <Link
                    href="/about"
                    className="font-semibold text-emerald-brand hover:underline inline-flex items-center gap-1"
                  >
                    Về chúng tôi →
                  </Link>
                </div>
              </Glass>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom indicator */}
      <div className="relative z-10 pt-12 flex items-center justify-between text-xs text-stone-400 font-mono border-t border-stone-200/50 mt-12 max-w-7xl mx-auto w-full">
        <span>EST. 2008 • VIETNAM JURISDICTION</span>
        <span className="hidden sm:inline">FRESHFIELDS • CLIFFORD CHANCE STANDARD</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>
    </section>
  );
}
