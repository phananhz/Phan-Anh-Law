import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { metricsData } from '@/data/navigation';

export default function IntroSection() {
  return (
    <section className="pt-24 sm:pt-36 pb-20 sm:pb-28 px-6 sm:px-8 bg-[#F4F3EF]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Eyebrow and Left Narrative */}
          <div className="lg:col-span-8 space-y-8">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-brand">
              VỀ CHÚNG TÔI
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-normal tracking-tight leading-[1.15] text-[#111111]">
              &ldquo;Pháp lý không chỉ là tuân thủ. <br />
              <span className="italic font-light text-stone-600">
                Đó là một phần của chiến lược kinh doanh.&rdquo;
              </span>
            </h2>

            <div className="max-w-2xl space-y-4 text-base sm:text-lg text-stone-600 leading-relaxed">
              <p>
                Tại Phan Anh Law, chúng tôi không xem pháp luật là rào cản hành chính. Chúng tôi kiến tạo các cấu trúc pháp lý tối ưu nhằm bảo vệ giá trị doanh nghiệp, thúc đẩy tốc độ ra quyết định của hội đồng quản trị và mở đường cho các thương vụ đầu tư thành công tại thị trường Việt Nam.
              </p>
              <p>
                Với phương pháp làm việc chuẩn mực thừa hưởng từ các hãng luật quốc tế Magic Circle và kinh nghiệm bản địa sâu sắc, các giải pháp của chúng tôi luôn gắn liền với tính khả thi thực tế và mục tiêu tài chính của thân chủ.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-brand hover:text-emerald-950 transition-colors group"
              >
                <span>Tìm hiểu thêm về phương pháp tiếp cận của chúng tôi</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Metrics Isolated from Data */}
          <div className="lg:col-span-4 lg:pt-14 space-y-8 border-t lg:border-t-0 lg:border-l border-stone-300/60 lg:pl-12">
            {metricsData.slice(0, 2).map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-serif text-5xl sm:text-6xl font-light text-[#111111] tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs sm:text-sm font-medium uppercase tracking-wider text-stone-500">
                  {metric.label}
                </div>
              </div>
            ))}

            <div className="pt-4 p-5 rounded-2xl bg-paper-alt border border-stone-300/40 text-xs text-stone-600 leading-relaxed">
              <div className="font-semibold text-stone-900 mb-1">Chuẩn mực dịch vụ</div>
              Đội ngũ luật sư giao tiếp thành thạo tiếng Việt, tiếng Anh và tiếng Pháp; tư vấn trực tiếp cho nhà đầu tư FDI và các định chế tài chính lớn.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
