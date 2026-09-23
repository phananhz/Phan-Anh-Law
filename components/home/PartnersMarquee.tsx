'use client';

import { useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { Pause, Play, ArrowUpRight } from 'lucide-react';
import type { Partner } from '@/data/partners';

type RowConfig = {
  duration: string;
  delay: string;
  seed: number;
};

const rows: RowConfig[] = [
  { duration: '38s', delay: '-7s', seed: 11 },
  { duration: '47s', delay: '-21s', seed: 29 },
  { duration: '56s', delay: '-34s', seed: 47 },
];

function stableHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function orderPartners(partners: Partner[], seed: number) {
  return [...partners].sort((left, right) => {
    const leftValue = stableHash(left.id + ':' + seed);
    const rightValue = stableHash(right.id + ':' + seed);
    return leftValue - rightValue;
  });
}

function PartnerCard({ partner, decorative = false }: { partner: Partner; decorative?: boolean }) {
  const content = (
    <div className="group flex min-w-[210px] items-center gap-4 rounded-2xl border border-stone-200/80 bg-white/70 px-5 py-4 shadow-[0_14px_35px_-24px_rgba(16,19,18,0.45)] backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white sm:min-w-[250px]">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#153E35] font-serif text-sm font-bold tracking-tight text-white shadow-sm">
        {partner.shortName}
      </div>
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-stone-900">{partner.name}</div>
        <div className="mt-1 truncate text-[10px] uppercase tracking-[0.13em] text-stone-500">{partner.descriptor}</div>
      </div>
      {partner.website && <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-stone-400" />}
    </div>
  );

  if (!partner.website) return content;

  return (
    <Link
      href={partner.website}
      target="_blank"
      rel="noreferrer"
      tabIndex={decorative ? -1 : undefined}
      aria-hidden={decorative || undefined}
      aria-label={'Mở website ' + partner.name}
    >
      {content}
    </Link>
  );
}

export default function PartnersMarquee({ partners }: { partners: Partner[] }) {
  const [paused, setPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState<Record<number, boolean>>({});

  return (
    <section id="partners" className="overflow-hidden border-y border-stone-200/70 bg-white/45 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-brand">ĐỐI TÁC &amp; KHÁCH HÀNG</div>
            <h2 className="max-w-2xl font-serif text-4xl leading-tight tracking-tight text-stone-900 sm:text-5xl">Những mối quan hệ được xây dựng bằng sự tin cậy.</h2>
          </div>
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-stone-300 bg-white/70 px-4 py-2 text-xs font-semibold text-stone-700 shadow-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-brand/30"
            aria-pressed={paused}
          >
            {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            {paused ? 'Tiếp tục chuyển động' : 'Tạm dừng chuyển động'}
          </button>
        </div>
      </div>

      <div className="mt-14 space-y-4">
        {rows.map((row, rowIndex) => {
          const ordered = orderPartners(partners, row.seed);
          const repeated = [...ordered, ...ordered];
          const style = {
            '--marquee-duration': row.duration,
            '--marquee-delay': row.delay,
          } as CSSProperties;

          return (
            <div
              key={row.seed}
              className="partners-marquee-shell"
              onMouseEnter={() => setHoverPaused((current) => ({ ...current, [rowIndex]: true }))}
              onMouseLeave={() => setHoverPaused((current) => ({ ...current, [rowIndex]: false }))}
            >
              <div
                className={'partners-marquee-track partners-marquee-row-' + (rowIndex + 1) + ((paused || hoverPaused[rowIndex]) ? ' is-paused' : '')}
                style={style}
                aria-label={'Luồng đối tác ' + (rowIndex + 1)}
              >
                {repeated.map((partner, index) => (
                  <div key={partner.id + '-' + rowIndex + '-' + index} aria-hidden={index >= ordered.length}>
                    <PartnerCard partner={partner} decorative={index >= ordered.length} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}