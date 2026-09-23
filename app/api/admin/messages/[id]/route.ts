import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { canManageMessages, getCurrentAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const messageStatusSchema = z.object({ status: z.enum(['new', 'in_progress', 'resolved', 'spam']) });
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin || !canManageMessages(admin.role)) return NextResponse.json({ error: 'Không có quyền cập nhật tin nhắn.' }, { status: 403 });
  const { id } = await params;
  if (!uuidPattern.test(id)) return NextResponse.json({ error: 'Mã tin nhắn không hợp lệ.' }, { status: 400 });
  const parsed = messageStatusSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Trạng thái không hợp lệ.' }, { status: 400 });
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: 'Supabase chưa được cấu hình.' }, { status: 503 });
  const result = await supabase.from('contact_messages').update({ status: parsed.data.status, updated_at: new Date().toISOString() }).eq('id', id).select('id, status').maybeSingle();
  if (result.error) return NextResponse.json({ error: 'Không thể cập nhật tin nhắn.' }, { status: 400 });
  if (!result.data) return NextResponse.json({ error: 'Không tìm thấy tin nhắn.' }, { status: 404 });
  revalidatePath('/admin');
  revalidatePath('/admin/messages');
  revalidatePath('/admin/messages/' + id);
  return NextResponse.json({ ok: true, status: result.data.status });
}
