import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import DraftNewsPreview from '@/components/admin/DraftNewsPreview';
import { getCurrentAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Xem trước bài viết',
  robots: { index: false, follow: false },
};

export default async function DraftNewsPreviewPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect('/login');
  return <DraftNewsPreview />;
}
