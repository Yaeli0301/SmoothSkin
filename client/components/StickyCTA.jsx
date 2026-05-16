'use client';

import Link from 'next/link';

export default function StickyCTA({ onClick, label = 'קני עכשיו', href, ctaColor = 'primary' }) {
  const btnClass = ctaColor === 'secondary' ? 'btn-secondary' : 'btn-primary';

  const content = (
    <button type="button" onClick={onClick} className={`${btnClass} w-full`}>
      {label}
    </button>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur border-t border-accent md:hidden shadow-soft">
      {href ? <Link href={href} className={`${btnClass} w-full block text-center`}>{label}</Link> : content}
    </div>
  );
}
