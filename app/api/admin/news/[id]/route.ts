import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { canEditNews, getCurrentAdmin } from '@/lib/auth';
import { legacyBodyToDocument, normalizeArticleDocument, isSafeArticleDocument } from '@/lib/news-content';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const updateSchema = z.object({
  title: z.string().trim().min(5).max(180),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(180),
  excerpt: z.string().trim().min(20).max(500),
  body: z.unknown(),
  category: z.string().trim().min(2).max(80),
  status: z.enum(['draft', 'published']),
  coverImagePath: z.string().trim().max(500).nullable().optional(),
  coverImageAlt: z.string().trim().max(240).optional(),
});

function ownsMediaPath(path: string, userId: string) {
  return path.startsWith('news/' + userId + '/');
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
  if (parsed.data.coverImagePath && !ownsMediaPath(parsed.data.coverImagePath, admin.id)) {
    return NextResponse.json({ error: 'Ảnh bìa không thuộc tài khoản hiện tại.' }, { status: 400 });
  }
  if (parsed.data.status === 'published' && parsed.data.coverImagePath && !parsed.data.coverImageAlt) {
    return NextResponse.json({ error: 'Hãy nhập mô tả ảnh bìa trước khi xuất bản.' }, { status: 400 });
  }

  const { id } = await params;
  const now = new Date().toISOString();
  const { error } = await supabase.from('articles').update({
    slug: parsed.data.slug,
    title: parsed.data.title,
    excerpt: parsed.data.excerpt,
    body_json: body,
    category: parsed.data.category,
    status: parsed.data.status,
    published_at: parsed.data.status === 'published' ? now : null,
    cover_image_path: parsed.data.coverImagePath || null,
    cover_image_alt: parsed.data.coverImageAlt || null,
    updated_at: now,
    updated_by: admin.id,
  }).eq('id', id);

  if (error) return NextResponse.json({ error: error.code === '23505' ? 'Slug đã tồn tại.' : 'Không thể cập nhật bài viết.' }, { status: 400 });

  revalidatePath('/');
  revalidatePath('/news');
  revalidatePath('/news/' + parsed.data.slug);
  return NextResponse.json({ ok: true });
}