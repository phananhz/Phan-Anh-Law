'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function ZaloIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path d="M4.5 3.5h15A1.5 1.5 0 0 1 21 5v9.5a1.5 1.5 0 0 1-1.5 1.5H13l-4.2 4v-4H4.5A1.5 1.5 0 0 1 3 14.5V5a1.5 1.5 0 0 1 1.5-1.5Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 8h7l-6 6h7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path d="M12 3.25c-5.2 0-9.25 3.72-9.25 8.45 0 2.66 1.38 5.03 3.57 6.58v3.08l3.2-1.75c.8.23 1.63.34 2.48.34 5.2 0 9.25-3.72 9.25-8.25 0-4.73-4.05-8.45-9.25-8.45Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="m7.5 13.8 2.75-2.95 2.1 1.55 3.2-2.05-2.75 2.95-2.1-1.55-3.2 2.05Z" fill="currentColor" />
    </svg>
  );
}

const buttonClass =
  'pointer-events-auto inline-flex h-11 min-w-[112px] items-center justify-center gap-2 rounded-full border border-white/70 bg-white/45 px-3.5 text-xs font-semibold text-[#153E35] shadow-[0_12px_30px_-10px_rgba(16,19,18,0.3),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl backdrop-saturate-150 transition-all hover:-translate-y-0.5 hover:bg-white/65 hover:shadow-lg';

export default function QuickContact() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin') || pathname === '/login') return null;
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 sm:bottom-8 sm:right-8">
      <Link href="/contact" aria-label="Liên hệ qua Zalo" title="Zalo" className={buttonClass}>
        <ZaloIcon />
        <span>Zalo</span>
      </Link>
      <a
        href="https://www.facebook.com/PhanAnhLaw.Co"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Liên hệ qua Messenger"
        title="Messenger"
        className={buttonClass}
      >
        <MessengerIcon />
        <span>Messenger</span>
      </a>


    </div>
  );
}
