import { NewsEditor } from '@/components/admin/NewsEditor';

export default function NewNewsPage() {
  return <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14"><div className="mb-10"><div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-brand">CONTENT / NEW</div><h1 className="mt-3 font-serif text-5xl tracking-tight text-stone-900">Đăng tin tức</h1></div><NewsEditor /></div>;
}
