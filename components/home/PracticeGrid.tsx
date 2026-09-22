import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Globe, Layers, Percent, Users2, FileCheck, ShieldAlert } from 'lucide-react';
import { practices } from '@/data/practices';
import SectionHeading from '@/components/ui/SectionHeading';

export default function PracticeGrid() {
  const fdiPractice = practices.find((p) => p.slug === 'foreign-investment') || practices[0];
  const corporatePractice = practices.find((p) => p.slug === 'corporate-ma') || practices[1];
  const taxPractice = practices.find((p) => p.slug === 'tax') || practices[2];
  const employmentPractice = practices.find((p) => p.slug === 'employment') || practices[3];
  const contractPractice = practices.find((p) => p.slug === 'commercial-contracts') || practices[4];
  const compliancePractice = practices.find((p) => p.slug === 'corporate-compliance') || practices[9];

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-8 bg-paper-alt border-y border-stone-300/40">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="LĨNH VỰC CHUYÊN MÔN"
          title="Chúng tôi có thể hỗ trợ bạn ở đâu?"
          description="Được thiết kế nhằm đồng hành cùng các quyết định kinh doanh cốt lõi của doanh nghiệp, từ thành lập pháp nhân đến các thương vụ phức tạp."
          align="split"
          action={
            <Link
              href="/practices"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-brand hover:text-emerald-950 transition-colors group"
            >
              <span>Xem toàn bộ 10 lĩnh vực tư vấn</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          }
        />

        {/* Editorial Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Featured Large Card: ĐẦU TƯ NƯỚC NGOÀI (Col-span 8) */}
          <div className="lg:col-span-8">
            <Link
              href={`/practices/${fdiPractice.slug}`}
              className="group relative flex flex-col justify-between h-full min-h-[380px] p-8 sm:p-10 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-emerald-800/30 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-light/40 via-sage-faint/20 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />

              <div>
                <div className="flex items-center justify-between pb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-emerald-brand bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                      {fdiPractice.number}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold">
                      Trọng tâm chiến lược
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 group-hover:bg-[#153E35] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <div className="space-y-4 max-w-xl">
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#111111] group-hover:text-emerald-brand transition-colors">
                    {fdiPractice.title}
                  </h3>
                  <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
                    {fdiPractice.shortDescription}
                  </p>
                </div>
              </div>

              {/* Scope Checklist Preview */}
              <div className="pt-8 border-t border-stone-100 mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-500">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand" />
                  Thành lập doanh nghiệp FDI & IRC / ERC
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand" />
                  Tài khoản vốn trực tiếp DICA & Ngân hàng
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand" />
                  Giấy phép kinh doanh bán lẻ (ENT)
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand" />
                  Bảo hộ đầu tư song phương & đa phương
                </span>
              </div>
            </Link>
          </div>

          {/* Secondary Card: DOANH NGHIỆP & M&A (Col-span 4) */}
          <div className="lg:col-span-4">
            <Link
              href={`/practices/${corporatePractice.slug}`}
              className="group relative flex flex-col justify-between h-full min-h-[380px] p-8 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-emerald-800/30 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between pb-6">
                  <span className="font-mono text-xs font-semibold text-stone-400 group-hover:text-emerald-brand transition-colors">
                    {corporatePractice.number}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 group-hover:bg-[#153E35] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-2xl text-[#111111] group-hover:text-emerald-brand transition-colors">
                    {corporatePractice.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {corporatePractice.shortDescription}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-100 text-xs font-medium text-emerald-brand group-hover:underline">
                Xem quy trình thẩm định LDD & SPA →
              </div>
            </Link>
          </div>

          {/* Row 2: 4 Column Cards (THUẾ, LAO ĐỘNG, HỢP ĐỒNG & THƯƠNG MẠI, GIẤY PHÉP & TUÂN THỦ) */}
          <div className="lg:col-span-3">
            <Link
              href={`/practices/${taxPractice.slug}`}
              className="group flex flex-col justify-between h-full p-7 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:shadow-lg hover:border-emerald-800/30 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between pb-4">
                  <span className="font-mono text-xs font-semibold text-stone-400 group-hover:text-emerald-brand transition-colors">
                    {taxPractice.number}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-brand transition-colors" />
                </div>
                <h3 className="font-serif text-xl text-[#111111] group-hover:text-emerald-brand transition-colors mb-2">
                  {taxPractice.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {taxPractice.shortDescription}
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-stone-100 text-[11px] font-medium text-stone-400 group-hover:text-stone-900">
                Ưu đãi thuế & Chuyển giá →
              </div>
            </Link>
          </div>

          <div className="lg:col-span-3">
            <Link
              href={`/practices/${employmentPractice.slug}`}
              className="group flex flex-col justify-between h-full p-7 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:shadow-lg hover:border-emerald-800/30 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between pb-4">
                  <span className="font-mono text-xs font-semibold text-stone-400 group-hover:text-emerald-brand transition-colors">
                    {employmentPractice.number}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-brand transition-colors" />
                </div>
                <h3 className="font-serif text-xl text-[#111111] group-hover:text-emerald-brand transition-colors mb-2">
                  {employmentPractice.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {employmentPractice.shortDescription}
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-stone-100 text-[11px] font-medium text-stone-400 group-hover:text-stone-900">
                Nội quy & Chuyên gia nước ngoài →
              </div>
            </Link>
          </div>

          <div className="lg:col-span-3">
            <Link
              href={`/practices/${contractPractice.slug}`}
              className="group flex flex-col justify-between h-full p-7 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:shadow-lg hover:border-emerald-800/30 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between pb-4">
                  <span className="font-mono text-xs font-semibold text-stone-400 group-hover:text-emerald-brand transition-colors">
                    {contractPractice.number}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-brand transition-colors" />
                </div>
                <h3 className="font-serif text-xl text-[#111111] group-hover:text-emerald-brand transition-colors mb-2">
                  {contractPractice.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {contractPractice.shortDescription}
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-stone-100 text-[11px] font-medium text-stone-400 group-hover:text-stone-900">
                Hợp đồng thương mại & EPC →
              </div>
            </Link>
          </div>

          <div className="lg:col-span-3">
            <Link
              href={`/practices/${compliancePractice.slug}`}
              className="group flex flex-col justify-between h-full p-7 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:shadow-lg hover:border-emerald-800/30 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between pb-4">
                  <span className="font-mono text-xs font-semibold text-stone-400 group-hover:text-emerald-brand transition-colors">
                    {compliancePractice.number}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-brand transition-colors" />
                </div>
                <h3 className="font-serif text-xl text-[#111111] group-hover:text-emerald-brand transition-colors mb-2">
                  Tuân thủ & Dữ liệu
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {compliancePractice.shortDescription}
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-stone-100 text-[11px] font-medium text-stone-400 group-hover:text-stone-900">
                Nghị định 13 & Kiểm toán tuân thủ →
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
