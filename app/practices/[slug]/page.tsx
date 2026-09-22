import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Clock,
} from 'lucide-react';
import { practices } from '@/data/practices';
import { people } from '@/data/people';
import { insights } from '@/data/insights';
import Glass from '@/components/ui/Glass';

interface PracticePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return practices.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PracticePageProps) {
  const { slug } = await params;
  const practice = practices.find((p) => p.slug === slug);
  if (!practice) return { title: 'Không tìm thấy lĩnh vực' };

  return {
    title: `${practice.title} | Phan Anh Law`,
    description: practice.shortDescription,
  };
}

export default async function PracticeDetailPage({ params }: PracticePageProps) {
  const { slug } = await params;
  const practice = practices.find((p) => p.slug === slug);

  if (!practice) {
    notFound();
  }

  // Find lead experts for this practice
  const leadExperts = people.filter((per) =>
    practice.leadExpertSlugs.includes(per.slug)
  );

  // Find related insights
  const relatedInsights = insights.slice(0, 2);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-8 bg-[#F4F3EF]">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 pb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-emerald-brand transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link href="/practices" className="hover:text-emerald-brand transition-colors">
            Lĩnh vực tư vấn
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-800 font-medium">{practice.title}</span>
        </nav>

        {/* Hero */}
        <header className="max-w-4xl pb-12 border-b border-stone-300/60">
          <div className="flex items-center gap-3 text-xs mb-4">
            <span className="font-mono font-semibold text-emerald-brand bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
              LĨNH VỰC {practice.number}
            </span>
            <span className="text-stone-400 uppercase tracking-widest font-mono">
              {practice.titleEn}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#111111] font-normal tracking-tight leading-[1.1] mb-6">
            {practice.title}
          </h1>

          <p className="text-lg sm:text-xl text-stone-700 leading-relaxed font-light">
            {practice.fullDescription || practice.shortDescription}
          </p>
        </header>

        {/* Section: Chúng tôi hỗ trợ gì (Services List) */}
        <section className="py-16 border-b border-stone-300/60">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-brand mb-3">
            PHẠM VI CÔNG VIỆC TƯ VẤN
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] mb-8">
            Chúng tôi hỗ trợ gì cho bạn?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {practice.services.map((service, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-5 rounded-xl bg-white border border-stone-200/80 shadow-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-brand shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-stone-800 font-medium leading-relaxed">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Quy trình tư vấn (Workflow) */}
        {practice.workflow && practice.workflow.length > 0 && (
          <section className="py-16 border-b border-stone-300/60">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-brand mb-3">
              QUY TRÌNH THỰC HIỆN
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] mb-10">
              Lộ trình tư vấn chuẩn mực
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {practice.workflow.map((step) => (
                <div
                  key={step.step}
                  className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm space-y-4"
                >
                  <div className="font-mono text-2xl font-light text-emerald-brand">
                    {step.step}
                  </div>
                  <h3 className="font-serif text-xl text-stone-900 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Các vấn đề thường gặp (Common Issues & Solutions) */}
        {practice.commonIssues && practice.commonIssues.length > 0 && (
          <section className="py-16 border-b border-stone-300/60">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-brand mb-3">
              THÁO GỠ VƯỚNG MẮC
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] mb-8">
              Các vấn đề thường gặp trong thực tế
            </h2>

            <div className="space-y-4">
              {practice.commonIssues.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200/80 shadow-sm space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <h3 className="font-medium text-base sm:text-lg text-stone-900">
                      {item.issue}
                    </h3>
                  </div>
                  <div className="pl-8 text-xs sm:text-sm text-stone-600 leading-relaxed bg-paper-subtle p-4 rounded-xl border border-stone-200/60">
                    <span className="font-semibold text-emerald-brand">Giải pháp đề xuất: </span>
                    {item.solution}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Chuyên gia phụ trách */}
        <section className="py-16 border-b border-stone-300/60">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-brand mb-3">
            NHÓM LUẬT SƯ PHỤ TRÁCH
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] mb-8">
            Luật sư chuyên môn hàng đầu
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadExperts.map((expert) => (
              <Link
                key={expert.id}
                href={`/people/${expert.slug}`}
                className="group p-6 rounded-2xl bg-white border border-stone-200/80 hover:shadow-xl hover:border-emerald-800/30 transition-all flex items-center gap-4"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-stone-100">
                  <Image
                    src={expert.photoUrl}
                    alt={expert.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-lg text-stone-900 group-hover:text-emerald-brand transition-colors truncate">
                    {expert.name}
                  </h3>
                  <p className="text-xs text-stone-500 truncate">{expert.position}</p>
                  <span className="text-[11px] text-emerald-brand font-medium inline-flex items-center gap-1 mt-1">
                    Xem hồ sơ <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section: Liên hệ tư vấn trực tiếp */}
        <section className="py-16">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#153E35] text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs uppercase tracking-widest text-sage-brand font-semibold">
                TƯ VẤN TRỰC TIẾP
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl">
                Cần cấu trúc pháp lý cho dự án của bạn?
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Đội ngũ luật sư Phan Anh Law sẵn sàng rà soát sơ bộ hồ sơ và tư vấn định hướng trong vòng 24 giờ làm việc.
              </p>
            </div>

            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-white text-[#153E35] font-semibold text-sm hover:bg-stone-100 transition-transform active:scale-95 shadow-xl shrink-0"
            >
              Đặt lịch trao đổi với Luật sư →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
