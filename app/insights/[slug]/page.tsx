import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Calendar, Clock, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { insights } from '@/data/insights';
import LegalReference from '@/components/ui/LegalReference';
import ArticleTOC from '@/components/insight/ArticleTOC';
import ArticleShareBar from '@/components/insight/ArticleShareBar';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return insights.map((insight) => ({
    slug: insight.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const insight = insights.find((i) => i.slug === slug);
  if (!insight) return { title: 'Không tìm thấy bài viết' };

  return {
    title: `${insight.title} | Góc pháp lý Phan Anh Law`,
    description: insight.excerpt,
    openGraph: {
      title: insight.title,
      description: insight.excerpt,
      type: 'article',
      publishedTime: insight.publishDate,
      authors: [insight.authorName],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const insight = insights.find((i) => i.slug === slug);

  if (!insight) {
    notFound();
  }

  const relatedInsights = insights
    .filter((i) => i.id !== insight.id)
    .slice(0, 3);

  return (
    <article className="min-h-screen pt-32 pb-24 px-6 sm:px-8 bg-[#F4F3EF]">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 pb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-emerald-brand transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link href="/insights" className="hover:text-emerald-brand transition-colors">
            Góc pháp lý
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-800 font-medium truncate max-w-xs sm:max-w-md">
            {insight.category}
          </span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl pb-10 border-b border-stone-300/60">
          <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
            <span className="px-3 py-1 rounded-full bg-[#153E35] text-white font-medium uppercase tracking-wider text-[11px]">
              {insight.category}
            </span>
            <span className="text-stone-500 font-medium">{insight.type}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-normal tracking-tight text-[#111111] leading-[1.12] mb-6">
            {insight.title}
          </h1>

          <p className="text-lg sm:text-xl text-stone-700 leading-relaxed font-serif italic mb-6">
            {insight.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs sm:text-sm text-stone-500 border-t border-stone-200">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-stone-400">Tác giả: </span>
                <span className="font-semibold text-stone-900">{insight.authorName}</span>
                <span className="text-stone-400 text-xs"> ({insight.authorRole})</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-stone-400" />
                {insight.formattedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-stone-400" />
                {insight.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Main 3-Column Editorial Layout */}
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Sticky Rail: Share & Print */}
          <div className="lg:col-span-2 hidden lg:block sticky top-32">
            <ArticleShareBar title={insight.title} />
          </div>

          {/* Center Column: Article Content (~760px max width) */}
          <div className="lg:col-span-7 max-w-[760px] mx-auto w-full">
            {/* Legal References Box Component */}
            {insight.legalReferences && insight.legalReferences.length > 0 && (
              <div className="mb-10 p-6 rounded-2xl bg-paper-alt border border-stone-300/70">
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-brand mb-2">
                  CĂN CỨ PHÁP LÝ LIÊN QUAN
                </div>
                <div className="space-y-3">
                  {insight.legalReferences.map((ref, idx) => (
                    <LegalReference key={idx} citation={ref} />
                  ))}
                </div>
              </div>
            )}

            {/* Render HTML content */}
            <div
              className="prose prose-stone max-w-none text-stone-800 leading-[1.8] text-base sm:text-lg font-normal
                prose-headings:font-serif prose-headings:font-normal prose-headings:text-stone-900
                prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pt-6 prose-h2:border-t prose-h2:border-stone-200
                prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:mb-5
                prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                prose-li:my-1.5
                prose-strong:text-stone-950 prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: insight.contentHtml || '' }}
            />

            {/* Mobile / Inline Share Bar */}
            <div className="lg:hidden my-8 pt-6 border-t border-stone-200">
              <ArticleShareBar title={insight.title} isInline />
            </div>

            {/* Official Legal Disclaimer Box */}
            <div className="mt-14 p-6 rounded-2xl bg-[#ECEAE4] border border-stone-300/80 text-xs sm:text-sm text-stone-600 leading-relaxed space-y-2">
              <div className="font-semibold text-stone-900 uppercase tracking-wider text-xs">
                Tuyên bố miễn trừ trách nhiệm
              </div>
              <p>
                Nội dung trên chỉ nhằm mục đích cung cấp thông tin chung và không cấu thành ý kiến tư vấn pháp lý cho bất kỳ trường hợp cụ thể nào. Quý độc giả có nhu cầu tư vấn chuyên sâu cho giao dịch hoặc dự án của mình vui lòng liên hệ trực tiếp với đội ngũ luật sư của Phan Anh Law.
              </p>
            </div>

            {/* Direct Consultation CTA Box */}
            <div className="mt-10 p-8 rounded-2xl bg-[#153E35] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h4 className="font-serif text-2xl">Cần tư vấn trực tiếp về chủ đề này?</h4>
                <p className="text-xs sm:text-sm text-stone-300 mt-1">
                  Đội ngũ luật sư chuyên trách sẵn sàng đánh giá sơ bộ hồ sơ của bạn.
                </p>
              </div>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-white text-[#153E35] font-medium text-xs sm:text-sm hover:bg-stone-100 transition-colors shrink-0"
              >
                Gặp chuyên gia →
              </Link>
            </div>
          </div>

          {/* Right Sticky Rail: Table of Contents (Mục lục) */}
          <div className="lg:col-span-3 sticky top-32 hidden lg:block">
            <ArticleTOC items={insight.toc} />
          </div>
        </div>

        {/* Related Insights Grid */}
        <section className="mt-24 pt-16 border-t border-stone-300/60">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs font-semibold tracking-wider uppercase text-emerald-brand mb-1">
                GỢI Ý TIẾP THEO
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#111111]">
                Bài viết liên quan
              </h3>
            </div>
            <Link
              href="/insights"
              className="text-xs font-semibold text-emerald-brand hover:underline"
            >
              Xem toàn bộ góc pháp lý →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedInsights.map((item) => (
              <Link
                key={item.id}
                href={`/insights/${item.slug}`}
                className="group flex flex-col justify-between p-7 rounded-2xl bg-white border border-stone-200/80 hover:shadow-lg hover:border-emerald-800/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-3">
                    <span className="font-semibold text-emerald-brand">{item.category}</span>
                    <span>{item.formattedDate}</span>
                  </div>
                  <h4 className="font-serif text-lg text-stone-900 group-hover:text-emerald-brand transition-colors leading-snug mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-600 line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                  <span>{item.readTime}</span>
                  <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-brand" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
