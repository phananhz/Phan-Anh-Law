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
  display_row: number | null;
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
    displayRow: row.display_row === 2 || row.display_row === 3 ? row.display_row : 1,
  };
}

export async function getPartnersPresentation(): Promise<{ partners: Partner[]; motionEnabled: boolean }> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return { partners, motionEnabled: true };

  const [partnersResult, settingResult] = await Promise.all([
    supabase
      .from('partners')
      .select('id, name, short_name, descriptor, website, logo_path, sort_order, display_row, is_active')
      .eq('is_active', true)
      .order('display_row', { ascending: true })
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true }),
    supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'partners_motion_enabled')
      .maybeSingle(),
  ]);

  if (partnersResult.error) return { partners: [], motionEnabled: true };
  const rawSetting = settingResult.data?.value;
  const motionEnabled = rawSetting !== false && !(typeof rawSetting === 'object' && rawSetting !== null && (rawSetting as { enabled?: unknown }).enabled === false);
  return {
    partners: ((partnersResult.data || []) as DatabasePartner[]).map((row) => toPartner(row, supabase)),
    motionEnabled,
  };
}

export async function getActivePartners(): Promise<Partner[]> {
  const presentation = await getPartnersPresentation();
  return presentation.partners;
}
