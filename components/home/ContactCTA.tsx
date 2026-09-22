'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import Glass from '@/components/ui/Glass';
import { offices } from '@/data/navigation';

export default function ContactCTA() {
  return (
    <section className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#153E35] text-white overflow-hidden">
      {/* Abstract Architectural Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium uppercase tracking-[0.2em] text-sage-brand">
          KẾT NỐI TƯ VẤN
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08]">
          Có một vấn đề pháp lý <br />
          <span className="italic font-light text-sage-light">cần giải quyết?</span>
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-xl text-stone-200 leading-relaxed font-light">
          Hãy cho chúng tôi biết bối cảnh. Chúng tôi sẽ giúp bạn xác định bước tiếp theo một cách rõ ràng và hiệu quả.
        </p>

        {/* LiquidGlass CTA Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="group">
            <Glass
              variant="button"
              cornerRadius={9999}
              className="px-8 py-4 bg-white text-[#153E35] hover:bg-stone-100 shadow-xl font-medium text-base inline-flex items-center gap-2 transition-transform hover:scale-102"
            >
              <span>Bắt đầu trao đổi</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#153E35]" />
            </Glass>
          </Link>
        </div>

        {/* Secondary Contact Info */}
        <div className="pt-10 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs sm:text-sm text-stone-300">
          <a
            href="mailto:contact@phananhlaw.vn"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4 text-sage-brand" />
            <span>contact@phananhlaw.vn</span>
          </a>

          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-sage-brand" />
            <span>Hà Nội: {offices[0].phone} • TP.HCM: {offices[1].phone}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
