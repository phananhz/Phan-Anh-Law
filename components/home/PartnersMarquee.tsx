'use client';

import { useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Partner } from '@/data/partners';

type RowConfig = {
  duration: string;
  delay: string;
};

const rows: RowConfig[] = [
  { duration: '38s', delay: '-7s' },
  { duration: '47s', delay: '-21s' },
  { duration: '56s', delay: '-34s' },
];

function PartnerCard({ partner, decorative = false }: { partner: Partner; decorative?: boolean }) {
  const content = (
    <div className="group flex min-w-[210px] items-center gap-4 rounded-2xl border border-stone-200/80 bg-white/70 px-5 py-4 shadow-[0_14px_35px_-24px_rgba(16,19,18,0.45)] backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white sm:min-w-[250px]">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#153E35] font-serif text-sm font-bold tracking-tight text-white shadow-sm">
        {partner.logoUrl ? <img src={partner.logoUrl} alt={partner.logoAlt || partner.name} loading="lazy" className="h-full w-full bg-white object-contain p-1" /> : partner.shortName}
      </div>
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-stone-900">{partner.name}</div>
        <div className="mt-1 truncate text-[10px] uppercase tracking-[0.13em] text-stone-500">{partner.descriptor}</div>
      </div>
      {partner.website && <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-stone-400" />}
    </div>
  );

  if (!partner.website) return content;

  return <Link href={partner.website} target="_blank" rel="noreferrer" tabIndex={decorative ? -1 : undefined} aria-hidden={decorative || undefined} aria-label={'Mở website ' + partner.name}>{content}</Link>;
}

export default function PartnersMarquee({
  partners: activePartners,
  motionEnabled,
}: {
  partners: Partner[];
  motionEnabled: boolean;
}) {
  const [hoverPaused, setHoverPaused] = useState<Record<number, boolean>>({});
  if (!activePartners.length) return null;

  const groupedRows = rows.map((_, rowIndex) => activePartners.filter((partner) => (partner.displayRow || 1) === rowIndex + 1));

  return (
    <section id="partners" className="overflow-hidden border-y border-stone-200/70 bg-white/45 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-brand">ĐỐI TÁC &amp; KHÁCH HÀNG</div>
          <h2 className="max-w-2xl font-serif text-4xl leading-tight tracking-tight text-stone-900 sm:text-5xl">Những mối quan hệ được xây dựng bằng sự tin cậy.</h2>
        </div>
      </div>
      <div className="mt-14 space-y-4">
        {rows.map((row, rowIndex) => {
          const ordered = groupedRows[rowIndex];
          if (!ordered.length) return null;
          const shouldAnimate = motionEnabled && ordered.length > 1;
          const repeated = shouldAnimate ? [...ordered, ...ordered] : ordered;
          const style = { '--marquee-duration': row.duration, '--marquee-delay': row.delay } as CSSProperties;
          const isPaused = hoverPaused[rowIndex];

          return (
            <div
              key={row.duration}
              className="partners-marquee-shell"
              onMouseEnter={() => setHoverPaused((current) => ({ ...current, [rowIndex]: true }))}
              onMouseLeave={() => setHoverPaused((current) => ({ ...current, [rowIndex]: false }))}
              onFocusCapture={() => setHoverPaused((current) => ({ ...current, [rowIndex]: true }))}
              onBlurCapture={() => setHoverPaused((current) => ({ ...current, [rowIndex]: false }))}
            >
              <div
                className={'partners-marquee-track partners-marquee-row-' + (rowIndex + 1) + (!shouldAnimate ? ' is-static' : '') + (isPaused ? ' is-paused' : '')}
                style={style}
                aria-label={'Luồng đối tác ' + (rowIndex + 1)}
              >
                {repeated.map((partner, index) => <div key={partner.id + '-' + rowIndex + '-' + index} aria-hidden={shouldAnimate && index >= ordered.length}><PartnerCard partner={partner} decorative={shouldAnimate && index >= ordered.length} /></div>)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
