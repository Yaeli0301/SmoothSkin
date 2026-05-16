'use client';

import Link from 'next/link';

export default function ExitIntentPopup({ show, onDismiss }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
      <div className="card max-w-md w-full text-center relative animate-in">
        <button
          type="button"
          onClick={onDismiss}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 text-2xl"
          aria-label="סגור"
        >
          ×
        </button>
        <p className="text-primary font-bold text-sm mb-2">המתנה! 🎁</p>
        <h3 className="text-2xl font-bold mb-3">10% הנחה נוספת היום בלבד</h3>
        <p className="text-gray-600 mb-6">השתמש/י בקוד <strong>SAVE10</strong> בקופה</p>
        <Link href="/product" onClick={onDismiss} className="btn-primary w-full block">
          הזמיני לפני שייגמר
        </Link>
      </div>
    </div>
  );
}
