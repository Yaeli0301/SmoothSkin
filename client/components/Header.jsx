'use client';

import Link from 'next/link';
import { useState } from 'react';
import { COLLECTION_LIST } from '@/constants/collections';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-accent/60">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary tracking-tight">
          Glow Routine
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/products" className="hover:text-primary transition">
            כל המוצרים
          </Link>
          {COLLECTION_LIST.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="hover:text-primary transition"
            >
              {c.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/admin/login" className="text-xs text-gray-400 hover:text-primary hidden sm:block">
            מנהל
          </Link>
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="תפריט"
          >
            ☰
          </button>
          <Link href="/products" className="btn-primary text-sm py-2.5 px-5 min-h-0 hidden sm:inline-flex">
            לקנות עכשיו
          </Link>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-accent/60 px-4 py-4 space-y-3 bg-white">
          <Link href="/products" className="block" onClick={() => setOpen(false)}>
            כל המוצרים
          </Link>
          {COLLECTION_LIST.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="block"
              onClick={() => setOpen(false)}
            >
              {c.title}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
