import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { canDeleteContent, canEditNews, getCurrentAdmin } from '@/lib/auth';
import { legacyBodyToDocument, normalizeArticleDocument, isSafeArticleDocument } from '@/lib/news-content';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const updateSchema = z.object({
  title: z.string().trim().min(5).max(180),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(180),
  excerpt: z.string().trim().min(20).max(500),
  body: z.unknown(),
  category: z.string().trim().min(2).max(80),
  status: z.enum(['draft', 'published', 'archived']),
  coverImagePath: z.string().trim().max(500).nullable().optional(),
  coverImageAlt: z.string().trim().max(240).optional(),
});

function ownsMediaPath(path: string, userId: string) {
  return path.startsWith('news/' + userId + '/');
}

function revalidateArticle(slug: string) {
  revalidatePath('/');
  revalidatePath('/news');
  if (slug) revalidatePath('/news/' + slug);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin || !canEditNews(admin.role)) return NextResponse.json({ error: 'Không có quyền thực hiện thao tác này.' }, { status: 403 });

  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: 'Supabase chưa được cấu hình.' }, { status: 503 });
  const parsed = updateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Dữ liệu bài viết chưa hợp lệ.' }, { status: 400 });

  const candidate = Array.isArray(parsed.data.body) ? legacyBodyToDocument(parsed.data.body) : parsed.data.body;
  if (!isSafeArticleDocument(candidate)) return NextResponse.json({ error: 'Nội dung rich-text không hợp lệ.' }, { status: 400 });
  const body = normalizeArticleDocument(candidate);
  if (parsed.data.status === 'published' && parsed.data.coverImagePath && !parsed.data.coverImageAlt) return NextResponse.json({ error: 'Hãy nhập mô tả ảnh bìa trước khi xuất bản.' }, { status: 400 });

  const { id } = await params;
  const existing = await supabase.from('articles').select('id, slug, status, published_at, cover_image_path').eq('id', id).eq('content_kind', 'news').maybeSingle();
  if (existing.error) return NextResponse.json({ error: 'Không thể tải bài viết.' }, { status: 400 });
  if (!existing.data) return NextResponse.json({ error: 'Không tìm thấy bài viết.' }, { status: 404 });
  if (parsed.data.coverImagePath && !ownsMediaPath(parsed.data.coverImagePath, admin.id) && parsed.data.coverImagePath !== existing.data.cover_image_path) return NextResponse.json({ error: 'Ảnh bìa không thuộc tài khoản hiện tại.' }, { status: 400 });

  const now = new Date().toISOString();
  const publishedAt = parsed.data.status === 'published'
    ? existing.data.status === 'published' && existing.data.published_at ? existing.data.published_at : now
    : null;
  const result = await supabase.from('articles').update({
    slug: parsed.data.slug,
    title: parsed.data.title,
    excerpt: parsed.data.excerpt,
    body_json: body,
    category: parsed.data.category,
    status: parsed.data.status,
    published_at: publishedAt,
    cover_image_path: parsed.data.coverImagePath || null,
    cover_image_alt: parsed.data.coverImageAlt || null,
    updated_at: now,
    updated_by: admin.id,
  }).eq('id', id).eq('content_kind', 'news').select('id, slug').maybeSingle();

  if (result.error) return NextResponse.json({ error: result.error.code === '23505' ? 'Slug đã tồn tại.' : 'Không thể cập nhật bài viết.' }, { status: 400 });
  if (!result.data) return NextResponse.json({ error: 'Không tìm thấy bài viết.' }, { status: 404 });
  revalidateArticle(existing.data.slug);
  revalidateArticle(result.data.slug);
  return NextResponse.json({ ok: true, id: result.data.id, slug: result.data.slug });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin || !canDeleteContent(admin.role)) return NextResponse.json({ error: 'Chỉ super admin được xóa bài viết.' }, { status: 403 });
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: 'Supabase chưa được cấu hình.' }, { status: 503 });
  const existing = await supabase.from('articles').select('id, slug').eq('id', id).eq('content_kind', 'news').maybeSingle();
  if (existing.error) return NextResponse.json({ error: 'Không thể tải bài viết.' }, { status: 400 });
  if (!existing.data) return NextResponse.json({ error: 'Không tìm thấy bài viết.' }, { status: 404 });
  const result = await supabase.from('articles').delete().eq('id', id).eq('content_kind', 'news').select('id').maybeSingle();
  if (result.error) return NextResponse.json({ error: 'Không thể xóa bài viết.' }, { status: 400 });
  revalidateArticle(existing.data.slug);
  return NextResponse.json({ ok: true });
}
