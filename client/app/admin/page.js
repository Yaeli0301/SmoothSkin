'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminPanel from '@/components/admin/AdminPanel';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) router.replace('/admin/login');
  }, [router]);

  return <AdminPanel />;
}
