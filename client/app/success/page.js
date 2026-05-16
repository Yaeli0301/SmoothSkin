'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { trackPurchase } from '@/utils/analytics';
import { getAbVariant } from '@/utils/abTest';

function SuccessContent() {
  const params = useSearchParams();

  useEffect(() => {
    const variant = getAbVariant();
    trackPurchase('hair-remover', variant.key, 149);
  }, []);

  return (
    <div className="section-padding text-center py-24">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-3xl font-bold mb-4">תודה על ההזמנה!</h1>
      <p className="text-gray-600 mb-2">ההזמנה שלך התקבלה בהצלחה.</p>
      {params.get('session_id') && (
        <p className="text-sm text-gray-400 mb-8">מספר עסקה: {params.get('session_id').slice(0, 20)}...</p>
      )}
      <p className="mb-8">נשלח אליך אימייל אישור בקרוב.</p>
      <Link href="/" className="btn-primary inline-flex">
        חזרה לדף הבית
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="section-padding text-center py-24">טוען...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
