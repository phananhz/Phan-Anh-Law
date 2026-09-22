import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  Mail,
  Phone,
  Globe,
  MapPin,
  Award,
  BookOpen,
  ArrowUpRight,
  ArrowRight,
  GraduationCap,
} from 'lucide-react';
import { LinkedInIcon } from '@/components/ui/Icons';
import { people } from '@/data/people';
import { insights } from '@/data/insights';

interface PersonPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return people.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PersonPageProps) {
  const { slug } = await params;
  const person = people.find((p) => p.slug === slug);
  if (!person) return { title: 'Không tìm thấy luật sư' };

  return {
    title: `${person.name} | ${person.position} - Phan Anh Law`,
    description: person.bio,
  };
}

export default async function PersonDetailPage({ params }: PersonPageProps) {
  const { slug } = await params;
  const person = people.find((p) => p.slug === slug);

  if (!person) {
    notFound();
  }

  // Find authored articles
  const authoredInsights = insights.filter((i) => i.authorSlug === person.slug);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-8 bg-[#F4F3EF]">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 pb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-emerald-brand transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link href="/people" className="hover:text-emerald-brand transition-colors">
            Đội ngũ chuyên gia
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-800 font-medium">{person.name}</span>
        </nav>

        {/* Profile Header Grid */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-stone-200/90 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Photo & Contact Links (Col-span 4) */}
            <div className="lg:col-span-4 space-y-6">
              <div
                className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-stone-100 shadow-md"
                // `Image fill` must always have a positioned, sized parent. These inline
                // fallbacks also prevent the photo from covering the page while a dev
                // stylesheet is being refreshed.
                style={{ position: 'relative', aspectRatio: '4 / 5', overflow: 'hidden' }}
              >
                <Image
                  src={person.photoUrl}
                  alt={person.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Direct Contact Info */}
              <div className="space-y-3 p-5 rounded-2xl bg-paper-subtle border border-stone-200/70 text-xs sm:text-sm text-stone-700">
                <a
                  href={`mailto:${person.email}`}
                  className="flex items-center gap-3 hover:text-emerald-brand transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-brand shrink-0" />
                  <span className="truncate">{person.email}</span>
                </a>

                <a
                  href={`tel:${person.phone}`}
                  className="flex items-center gap-3 hover:text-emerald-brand transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-brand shrink-0" />
                  <span>{person.phone}</span>
                </a>

                <div className="flex items-center gap-3 text-stone-600">
                  <MapPin className="w-4 h-4 text-emerald-brand shrink-0" />
                  <span>Văn phòng {person.office}</span>
                </div>

                <div className="flex items-center gap-3 text-stone-600">
                  <Globe className="w-4 h-4 text-emerald-brand shrink-0" />
                  <span>Ngôn ngữ: {person.languages.join(', ')}</span>
                </div>

                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-emerald-brand font-medium hover:underline pt-2 border-t border-stone-200/60"
                >
                  <LinkedInIcon className="w-4 h-4 shrink-0" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>

            {/* Right Information & Bio (Col-span 8) */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                <div className="text-xs uppercase tracking-widest text-emerald-brand font-semibold mb-2">
                  {person.positionEn}
                </div>
                <h1 className="font-serif text-3xl sm:text-5xl text-[#111111] leading-tight mb-2">
                  {person.name}
                </h1>
                <p className="text-base text-stone-500 font-medium">
                  {person.position}
                </p>
              </div>

              {/* Practice Areas Tags */}
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Lĩnh vực chuyên môn chính:
                </div>
                <div className="flex flex-wrap gap-2">
                  {person.primaryExpertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-brand text-xs font-semibold border border-emerald-100"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Biography */}
              <div className="space-y-3 pt-4 border-t border-stone-100">
                <h2 className="font-serif text-2xl text-[#111111]">
                  Tiểu sử & Quá trình hành nghề
                </h2>
                <p className="text-stone-700 text-base leading-relaxed">
                  {person.bio}
                </p>
              </div>

              {/* Notable Experience Highlights */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <h2 className="font-serif text-2xl text-[#111111]">
                  Kinh nghiệm giao dịch tiêu biểu
                </h2>
                <ul className="space-y-2.5 text-stone-700 text-sm leading-relaxed">
                  {person.experience.map((exp, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand shrink-0 mt-2" />
                      <span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Education & Bar Admissions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    <GraduationCap className="w-4 h-4 text-emerald-brand" />
                    <span>Học vấn & Bằng cấp</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
                    {person.education.map((edu, idx) => (
                      <li key={idx}>{edu}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    <Award className="w-4 h-4 text-emerald-brand" />
                    <span>Tổ chức nghề nghiệp</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
                    {person.admissions.map((adm, idx) => (
                      <li key={idx}>{adm}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Authored Articles / Insights */}
        {authoredInsights.length > 0 && (
          <section className="mt-16 pt-12 border-t border-stone-300/60">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#111111] mb-6">
              Bài viết & Phân tích của {person.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {authoredInsights.map((art) => (
                <Link
                  key={art.id}
                  href={`/insights/${art.slug}`}
                  className="p-6 rounded-2xl bg-white border border-stone-200/80 hover:shadow-lg hover:border-emerald-800/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                      <span className="font-semibold text-emerald-brand">{art.category}</span>
                      <span>{art.formattedDate}</span>
                    </div>
                    <h3 className="font-serif text-lg text-stone-900 leading-snug mb-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2">
                      {art.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                    <span>{art.readTime}</span>
                    <span className="text-emerald-brand font-medium inline-flex items-center gap-1">
                      Đọc bài viết <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
