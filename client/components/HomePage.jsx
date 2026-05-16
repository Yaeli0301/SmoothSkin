'use client';

import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/store/ProductCard';
import { COLLECTION_LIST } from '@/constants/collections';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function HomePage({ products = [] }) {
  useAnalytics('/', null);

  return (
    <>
      <section className="section-padding pt-10 pb-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-right order-2 md:order-1">
          <p className="text-primary font-medium mb-4 tracking-wide">Glow Routine</p>
          <h1 className="premium-heading text-4xl md:text-5xl leading-tight mb-6">
            יופי טבעי מתחיל בתחושה שלך
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            מוצרים חכמים לטיפוח וניקוי שמפשטים את שגרת היופי שלך בבית
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Link href="/products" className="btn-primary">
              לגלות את הקולקציה
            </Link>
            <Link href="/collections/skin-care" className="btn-outline">
              טיפוח עור
            </Link>
          </div>
        </div>
        <div className="order-1 md:order-2 relative aspect-square max-w-lg mx-auto rounded-card overflow-hidden shadow-card">
          <Image
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80"
            alt="שגרת יופי בבית"
            fill
            priority
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="section-padding bg-accent/40">
        <h2 className="premium-heading text-2xl text-center mb-10">הקולקציות שלנו</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COLLECTION_LIST.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="card p-0 overflow-hidden group hover:shadow-card transition"
            >
              <div className="relative h-40">
                <Image src={c.heroImage} alt={c.title} fill className="object-cover group-hover:scale-105 transition" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{c.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{c.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-padding">
        <h2 className="premium-heading text-2xl text-center mb-3">מוצרים מובילים</h2>
        <p className="text-center text-gray-500 mb-10">נבחרו בשביל שגרה פשוטה וברורה</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p._id || p.slug} product={p} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/products" className="btn-outline">
            לכל המוצרים
          </Link>
        </div>
      </section>

      <section className="section-padding bg-surface text-center max-w-3xl mx-auto rounded-card">
        <h2 className="premium-heading text-2xl mb-4">להרגיש טוב עם עצמך – כל יום מחדש</h2>
        <p className="text-gray-600 mb-6">
          אנחנו מאמינים בטיפוח שמרגיש טבעי: פחות רעש, יותר בהירות, ושגרה שאפשר לשמור עליה.
        </p>
        <Link href="/products" className="btn-primary">
          לקנות עכשיו
        </Link>
      </section>
    </>
  );
}
