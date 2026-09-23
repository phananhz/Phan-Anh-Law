'use client';

import { createBrowserClient } from '@supabase/ssr';
import { isSupabaseConfigured, supabasePublishableKey, supabaseUrl } from '@/lib/config';

export function createSupabaseBrowserClient() {
  if (!isSupabaseConfigured()) return null;

  return createBrowserClient(
    supabaseUrl!,
    supabasePublishableKey!,
  );
}
