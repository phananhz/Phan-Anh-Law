export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// The Vercel Supabase integration uses PUBLISHABLE_KEY. Keep ANON_KEY for
// existing local setups and deployments using the older variable name.
export const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabasePublishableKey);
}
