'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopBanner from '@/components/store/TopBanner';
import { fetchStoreSettings } from '@/utils/api';

export default function StoreShell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const [storeSettings, setStoreSettings] = useState(null);

  useEffect(() => {
    if (!isAdmin) fetchStoreSettings().then(setStoreSettings);
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
