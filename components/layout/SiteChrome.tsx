'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QuickContact from '@/components/layout/QuickContact';

function isInternalRoute(pathname: string | null) {
  return pathname === '/login' || Boolean(pathname?.startsWith('/admin'));
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const internal = isInternalRoute(pathname);

  return (
    <>
      {!internal && <Header />}
      {!internal && <QuickContact />}
      <div className="flex-1">{children}</div>
      {!internal && <Footer />}
    </>
  );
}