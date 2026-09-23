'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { offices } from '@/data/navigation';

export default function ContactCTA() {
  return (
    <section data-nav-theme="dark" className="relative overflow-hidden bg-[#153E35] px-6 py-20 text-white sm:px-8 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/15 blur-3xl" />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-sage-brand">KẾT NỐI TƯ VẤN</div>
          <h2 className="font-serif text-4xl font-normal leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">Có một vấn đề pháp lý<br /><span className="italic font-light text-sage-light">cần giải quyết?</span></h2>
          <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-stone-200 sm:text-xl">Hãy cho chúng tôi biết bối cảnh. Chúng tôi sẽ giúp bạn xác định bước tiếp theo một cách rõ ràng và hiệu quả.</p>
          <Link href="/contact" className="group mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#153E35] shadow-xl transition-all hover:bg-stone-100 hover:shadow-2xl">Bắt đầu trao đổi<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
        </div>
        <aside className="rounded-[2rem] border border-white/15 bg-white/[0.08] p-7 text-left backdrop-blur-md sm:p-9">
          <div className="mb-8 text-xs font-semibold uppercase tracking-[0.18em] text-sage-brand">Liên hệ trực tiếp</div>
          <div className="space-y-5 text-sm text-stone-200">
            <a href="mailto:contact@phananhlaw.vn" className="flex items-center gap-3 transition-colors hover:text-white"><Mail className="h-5 w-5 shrink-0 text-sage-brand" /><span>contact@phananhlaw.vn</span></a>
            <div className="flex items-start gap-3 border-t border-white/10 pt-5"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-sage-brand" /><span>Hà Nội: {offices[0].phone}<br />TP.HCM: {offices[1].phone}</span></div>
          </div>
          <div className="mt-6 border-t border-white/10 pt-5 text-xs leading-relaxed text-stone-400">Phản hồi trong giờ làm việc. Thông tin trao đổi được bảo mật.</div>
        </aside>
      </div>
    </section>
  );
}