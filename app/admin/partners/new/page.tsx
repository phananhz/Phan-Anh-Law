import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PartnerEditor from '@/components/admin/PartnerEditor';

export default function NewPartnerPage() {
  return <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14"><Link href="/admin/partners" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-brand"><ArrowLeft className="h-4 w-4" />Quay lại Đối tác</Link><div className="mb-10 mt-8"><div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-brand">RELATIONSHIPS / NEW</div><h1 className="mt-3 font-serif text-5xl tracking-tight text-stone-900">Thêm đối tác</h1></div><PartnerEditor /></div>;
}
