import 'server-only';

import { partners, type Partner } from '@/data/partners';
import { createSupabasePublicClient } from '@/lib/supabase/public';

type DatabasePartner = {
  id: string;
  name: string;
  short_name: string;
  descriptor: string;
  website: string | null;
  logo_path: string | null;
  sort_order: number;
  is_active: boolean;
};

function toPartner(row: DatabasePartner, supabase: ReturnType<typeof createSupabasePublicClient>): Partner {
  let logoUrl: string | undefined;
  if (row.logo_path) {
    logoUrl = /^https?:\/\//i.test(row.logo_path)
      ? row.logo_path
      : supabase?.storage.from('partner-media').getPublicUrl(row.logo_path).data.publicUrl;
  }

  return {
    id: row.id,
    name: row.name,
    shortName: row.short_name,
    descriptor: row.descriptor,
    website: row.website || undefined,
    logoUrl,
    logoAlt: row.name,
    sortOrder: row.sort_order,
    isActive: row.is_active,
  };
}

export async function getActivePartners(): Promise<Partner[]> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return partners;

  const { data, error } = await supabase
    .from('partners')
    .select('id, name, short_name, descriptor, website, logo_path, sort_order, is_active')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });

  if (error) return [];
  return ((data || []) as DatabasePartner[]).map((row) => toPartner(row, supabase));
}
