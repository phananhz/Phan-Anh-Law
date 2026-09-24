import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { partners } from '@/data/partners';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import PartnerEditor from '@/components/admin/PartnerEditor';

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  let partner: { id: string; name: string; short_name: string; descriptor: string; website: string | null; logo_path: string | null; sort_order: number; display_row: number | null; is_active: boolean } | null = null;
  if (supabase) {
    const result = await supabase.from('partners').select('id, name, short_name, descriptor, website, logo_path, sort_order, display_row, is_active').eq('id', id).maybeSingle();
    if (result.error) throw new Error('Không thể tải đối tác.');
    partner = result.data;
  } else {
    const fallback = partners.find((item) => item.id === id);
    partner = fallback ? { id: fallback.id, name: fallback.name, short_name: fallback.shortName, descriptor: fallback.descriptor, website: fallback.website || null, logo_path: fallback.logoUrl || null, sort_order: fallback.sortOrder || 0, display_row: fallback.displayRow || 1, is_active: fallback.isActive !== false } : null;
  }
  if (!partner) notFound();

  return <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14"><Link href="/admin/partners" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-brand"><ArrowLeft className="h-4 w-4" />Quay lại Đối tác</Link><div className="mb-10 mt-8"><div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-brand">RELATIONSHIPS / EDIT</div><h1 className="mt-3 font-serif text-5xl tracking-tight text-stone-900">Chỉnh sửa đối tác</h1></div><PartnerEditor initialPartner={{ id: partner.id, name: partner.name, shortName: partner.short_name, descriptor: partner.descriptor, website: partner.website || '', logoPath: partner.logo_path || '', sortOrder: partner.sort_order, displayRow: partner.display_row === 2 || partner.display_row === 3 ? partner.display_row : 1, isActive: partner.is_active }} /></div>;
}
