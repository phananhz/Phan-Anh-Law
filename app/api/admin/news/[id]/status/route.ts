import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { canEditNews, getCurrentAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const statusSchema = z.object({ status: z.enum(['draft', 'published', 'archived']) });

function revalidateArticle(slug: string) {
  revalidatePath('/');
  revalidatePath('/news');
  if (slug) revalidatePath('/news/' + slug);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin || !canEditNews(admin.role)) return NextResponse.json({ error: 'Không có quyền cập nhật trạng thái bài viết.' }, { status: 403 });
  const parsed = statusSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Trạng thái bài viết chưa hợp lệ.' }, { status: 400 });
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: 'Supabase chưa được cấu hình.' }, { status: 503 });
  const { id } = await params;
  const existing = await supabase.from('articles').select('id, slug, status, published_at, cover_image_path, cover_image_alt').eq('id', id).eq('content_kind', 'news').maybeSingle();
  if (existing.error) return NextResponse.json({ error: 'Không thể tải bài viết.' }, { status: 400 });
  if (!existing.data) return NextResponse.json({ error: 'Không tìm thấy bài viết.' }, { status: 404 });
  if (parsed.data.status === 'published' && existing.data.cover_image_path && !existing.data.cover_image_alt) return NextResponse.json({ error: 'Hãy thêm mô tả ảnh bìa trước khi hiển thị bài viết.' }, { status: 400 });

  const now = new Date().toISOString();
  const publishedAt = parsed.data.status === 'published'
    ? existing.data.status === 'published' && existing.data.published_at ? existing.data.published_at : now
    : null;
  const result = await supabase.from('articles').update({ status: parsed.data.status, published_at: publishedAt, updated_at: now, updated_by: admin.id }).eq('id', id).eq('content_kind', 'news').select('id, status, published_at').maybeSingle();
  if (result.error) return NextResponse.json({ error: 'Không thể cập nhật trạng thái bài viết.' }, { status: 400 });
  revalidateArticle(existing.data.slug);
  return NextResponse.json({ ok: true, status: result.data?.status, publishedAt: result.data?.published_at });
}
