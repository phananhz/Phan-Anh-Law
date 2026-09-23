import 'server-only';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export type AdminRole = 'viewer' | 'editor' | 'super_admin';

export type CurrentAdmin = {
  id: string;
  email?: string;
  displayName: string;
  role: AdminRole;
};

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile, error } = await supabase
    .from('admin_profiles')
    .select('display_name, role, status')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error || !profile || profile.status !== 'active') return null;

  const role = profile.role as AdminRole;
  if (!['viewer', 'editor', 'super_admin'].includes(role)) return null;

  return {
    id: user.id,
    email: user.email,
    displayName: profile.display_name || user.email?.split('@')[0] || 'Admin',
    role,
  };
}

export function canEditNews(role: AdminRole) {
  return role === 'editor' || role === 'super_admin';
}
