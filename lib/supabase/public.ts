import 'server-only';

import { createClient } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabasePublishableKey, supabaseUrl } from '@/lib/config';

// Public content is also read while Next.js generates static pages, where
// request cookies are unavailable. The publishable key stays subject to RLS.
export function createSupabasePublicClient() {
  if (!isSupabaseConfigured()) return null;

  return createClient(
    supabaseUrl!,
    supabasePublishableKey!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    },
  );
}