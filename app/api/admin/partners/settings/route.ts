import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { canManagePartners, getCurrentAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const settingsSchema = z.object({ motionEnabled: z.boolean() });

export async function PATCH(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin || !canManagePartners(admin.role)) return NextResponse.json({ error: 'Không có quyền cập nhật cài đặt đối tác.' }, { status: 403 });
  const parsed = settingsSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Cài đặt chuyển động chưa hợp lệ.' }, { status: 400 });
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: 'Supabase chưa được cấu hình.' }, { status: 503 });
  const result = await supabase.from('site_settings').upsert({ key: 'partners_motion_enabled', value: parsed.data.motionEnabled, updated_by: admin.id, updated_at: new Date().toISOString() }, { onConflict: 'key' }).select('key, value').single();
  if (result.error) return NextResponse.json({ error: 'Không thể lưu cài đặt chuyển động.' }, { status: 400 });
  revalidatePath('/');
  revalidatePath('/admin/partners');
  return NextResponse.json({ ok: true, motionEnabled: result.data.value === true });
}
