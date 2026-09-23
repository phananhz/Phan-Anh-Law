import 'server-only';

import { partners, type Partner } from '@/data/partners';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function getActivePartners(): Promise<Partner[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return partners;

  const { data, error } = await supabase
    .from('partners')
    .select('id, name, short_name, descriptor, website')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error || !data?.length) return partners;

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    shortName: row.short_name,
    descriptor: row.descriptor,
    website: row.website || undefined,
  }));
}
