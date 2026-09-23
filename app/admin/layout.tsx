import { redirect } from 'next/navigation';
import { isSupabaseConfigured } from '@/lib/config';
import { getCurrentAdmin } from '@/lib/auth';
import AdminShell from '@/components/admin/AdminShell';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) {
    if (process.env.NODE_ENV === 'production') redirect('/login?error=configuration');
    return <AdminShell admin={null}>{children}</AdminShell>;
  }

  const admin = await getCurrentAdmin();
  if (!admin) redirect('/login');

  return <AdminShell admin={admin}>{children}</AdminShell>;
}
