'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopBanner from '@/components/store/TopBanner';
import { FALLBACK_STORE_SETTINGS } from '@/utils/fallbackProducts';

export default function StoreShell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const [storeSettings, setStoreSettings] = useState(FALLBACK_STORE_SETTINGS);

  useEffect(() => {
    if (isAdmin) return;
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    fetch(`${url}/store/settings`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && setStoreSettings(data))
      .catch(() => {});
  }, [isAdmin]);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <TopBanner settings={storeSettings} />
      <Header />
      <main className="min-h-screen pb-24 md:pb-0">{children}</main>
      <Footer />
    </>
  );
}
