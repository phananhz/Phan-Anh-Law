import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const contactSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  company: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(7).max(40),
  practice: z.string().trim().min(2).max(160),
  message: z.string().trim().min(20).max(5000),
  agreePrivacy: z.literal(true),
  website: z.string().optional(),
});

const attempts = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function rateLimitKey(request: Request, email: string) {
  const forwarded = request.headers.get('x-forwarded-for') || 'unknown';
  const ip = forwarded.split(',')[0].trim();
  return createHash('sha256').update(ip + ':' + email.toLowerCase()).digest('hex');
}

function isRateLimited(key: string) {
  const now = Date.now();
  const active = (attempts.get(key) || []).filter((time) => now - time < WINDOW_MS);
  if (active.length >= MAX_ATTEMPTS) {
    attempts.set(key, active);
    return true;
  }
  active.push(now);
  attempts.set(key, active);
  return false;
}

export async function POST(request: Request) {
  const input = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(input);
  if (parsed.success && parsed.data.website?.trim()) return NextResponse.json({ ok: true });
  if (!parsed.success) return NextResponse.json({ error: 'Vui lòng kiểm tra lại thông tin đã nhập.' }, { status: 400 });
  if (isRateLimited(rateLimitKey(request, parsed.data.email))) {
    return NextResponse.json({ error: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ít phút.' }, { status: 429 });
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: 'Form liên hệ chưa được kết nối với Supabase.' }, { status: 503 });

  const normalizedEmail = parsed.data.email.toLowerCase();
  const normalizedPhone = parsed.data.phone.replace(/[^0-9+]/g, '');
  const { error } = await supabase.from('contact_messages').insert({
    full_name: parsed.data.fullName,
    company: parsed.data.company,
    email: parsed.data.email,
    normalized_email: normalizedEmail,
    phone: parsed.data.phone,
    normalized_phone: normalizedPhone,
    practice: parsed.data.practice,
    message: parsed.data.message,
    privacy_consent_at: new Date().toISOString(),
  });

  if (error) return NextResponse.json({ error: 'Không thể lưu yêu cầu lúc này. Vui lòng thử lại sau.' }, { status: 500 });
  return NextResponse.json({ ok: true });
}