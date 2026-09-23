import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { canDeleteContent, canManagePartners, getCurrentAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const urlField = z.string().trim().max(500).refine((value) => !value || /^https?:\/\//i.test(value), 'Chỉ chấp nhận URL http hoặc https.');
const partnerSchema = z.object({ name: z.string().trim().min(2).max(160), shortName: z.string().trim().min(1).max(12), descriptor: z.string().trim().max(160), website: urlField, logoPath: urlField, sortOrder: z.coerce.number().int().min(-100000).max(100000), isActive: z.boolean() });
const partnerPatchSchema = partnerSchema.partial();
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function revalidatePartner(id: string) {
  revalidatePath('/');
  revalidatePath('/admin/partners');
  revalidatePath('/admin/partners/' + id + '/edit');
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin || !canManagePartners(admin.role)) return NextResponse.json({ error: 'Không có quyền cập nhật đối tác.' }, { status: 403 });
  const { id } = await params;
  if (!uuidPattern.test(id)) return NextResponse.json({ error: 'Mã đối tác không hợp lệ.' }, { status: 400 });
  const parsed = partnerPatchSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || !Object.keys(parsed.data).length) return NextResponse.json({ error: 'Dữ liệu cập nhật chưa hợp lệ.' }, { status: 400 });
  const data = parsed.data;
  const update: Record<string, unknown> = {};
  if (data.name !== undefined) update.name = data.name;
  if (data.shortName !== undefined) update.short_name = data.shortName;
  if (data.descriptor !== undefined) update.descriptor = data.descriptor;
  if (data.website !== undefined) update.website = data.website || null;
  if (data.logoPath !== undefined) update.logo_path = data.logoPath || null;
  if (data.sortOrder !== undefined) update.sort_order = data.sortOrder;
  if (data.isActive !== undefined) update.is_active = data.isActive;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: 'Supabase chưa được cấu hình.' }, { status: 503 });
  const result = await supabase.from('partners').update(update).eq('id', id).select('id, is_active').maybeSingle();
  if (result.error) return NextResponse.json({ error: 'Không thể cập nhật đối tác.' }, { status: 400 });
  if (!result.data) return NextResponse.json({ error: 'Không tìm thấy đối tác.' }, { status: 404 });
  revalidatePartner(id);
  return NextResponse.json({ ok: true, id: result.data.id, isActive: result.data.is_active });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin || !canDeleteContent(admin.role)) return NextResponse.json({ error: 'Chỉ super admin được xóa đối tác.' }, { status: 403 });
  const { id } = await params;
  if (!uuidPattern.test(id)) return NextResponse.json({ error: 'Mã đối tác không hợp lệ.' }, { status: 400 });
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: 'Supabase chưa được cấu hình.' }, { status: 503 });
  const result = await supabase.from('partners').delete().eq('id', id).select('id').maybeSingle();
  if (result.error) return NextResponse.json({ error: 'Không thể xóa đối tác.' }, { status: 400 });
  if (!result.data) return NextResponse.json({ error: 'Không tìm thấy đối tác.' }, { status: 404 });
  revalidatePartner(id);
  return NextResponse.json({ ok: true });
}
