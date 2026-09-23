import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { canEditNews, getCurrentAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

const acceptedTypes = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/avif', 'avif'],
]);

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin || !canEditNews(admin.role)) {
    return NextResponse.json({ error: 'Không có quyền tải ảnh.' }, { status: 403 });
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Chưa chọn ảnh.' }, { status: 400 });
  }

  const extension = acceptedTypes.get(file.type);
  if (!extension) {
    return NextResponse.json({ error: 'Chỉ nhận ảnh JPEG, PNG, WebP hoặc AVIF.' }, { status: 400 });
  }
  if (file.size <= 0 || file.size > 4 * 1024 * 1024) {
    return NextResponse.json({ error: 'Ảnh phải lớn hơn 0 và nhỏ hơn 4 MB.' }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: 'Supabase chưa được cấu hình.' }, { status: 503 });

  const path = 'news/' + admin.id + '/' + randomUUID() + '.' + extension;
  const { error } = await supabase.storage.from('news-media').upload(path, await file.arrayBuffer(), {
    contentType: file.type,
    cacheControl: '31536000',
    upsert: false,
  });

  if (error) return NextResponse.json({ error: 'Không thể lưu ảnh. Hãy kiểm tra bucket news-media.' }, { status: 400 });

  const url = supabase.storage.from('news-media').getPublicUrl(path).data.publicUrl;
  return NextResponse.json({
    path,
    url,
    alt: file.name.replace(/\.[^/.]+$/, '').slice(0, 160),
  });
}