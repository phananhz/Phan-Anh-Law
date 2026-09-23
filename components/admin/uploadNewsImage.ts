export async function uploadNewsImage(file: File) {
  const formData = new FormData();
  formData.set('file', file);

  const response = await fetch('/api/admin/news/media', {
    method: 'POST',
    body: formData,
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok || !payload.url) {
    throw new Error(payload.error || 'Không thể tải ảnh lên.');
  }

  return payload as { path: string; url: string; alt: string };
}