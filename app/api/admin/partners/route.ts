import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { canManagePartners, getCurrentAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const urlField = z.string().trim().max(500).refine((value) => !value || /^https?:\/\//i.test(value), 'Chỉ chấp nhận URL http hoặc https.');
const partnerSchema = z.object({
  name: z.string().trim().min(2).max(160),
  shortName: z.string().trim().min(1).max(12),
  descriptor: z.string().trim().max(160),
  website: urlField,
  logoPath: urlField,
  sortOrder: z.coerce.number().int().min(-100000).max(100000),
  displayRow: z.coerce.number().int().min(1).max(3),
  isActive: z.boolean(),
});

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin || !canManagePartners(admin.role)) return NextResponse.json({ error: 'Không có quyền tạo đối tác.' }, { status: 403 });
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: 'Supabase chưa được cấu hình.' }, { status: 503 });
  const parsed = partnerSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Dữ liệu đối tác chưa hợp lệ.' }, { status: 400 });
  const data = parsed.data;
  const result = await supabase.from('partners').insert({ name: data.name, short_name: data.shortName, descriptor: data.descriptor, website: data.website || null, logo_path: data.logoPath || null, sort_order: data.sortOrder, display_row: data.displayRow, is_active: data.isActive }).select('id').single();
  if (result.error) return NextResponse.json({ error: 'Không thể tạo đối tác.' }, { status: 400 });
  revalidatePath('/');
  revalidatePath('/admin/partners');
  return NextResponse.json({ id: result.data.id });
}
