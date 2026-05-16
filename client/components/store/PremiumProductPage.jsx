'use client';

import Link from 'next/link';
import ImageGallery from '@/components/product/ImageGallery';
import CheckoutModal from '@/components/CheckoutModal';
import StickyCTA from '@/components/StickyCTA';
import StarRating from '@/components/store/StarRating';
import { useCartStore } from '@/hooks/useCartStore';
import { useAnalytics } from '@/hooks/useAnalytics';
import { trackAddToCart } from '@/utils/analytics';
import { COLLECTIONS } from '@/constants/collections';

function TrustRow() {
  return (
    <div className="grid grid-cols-3 gap-3 text-center text-sm text-gray-600 py-4 border-t border-accent/50">
      <div>🚚 משלוח מהיר</div>
      <div>🔒 תשלום מאובטח</div>
      <div>✅ אחריות</div>
    </div>
  );
}

export default function PremiumProductPage({ product }) {
  const { checkoutOpen, openCheckout, closeCheckout } = useCartStore();
  useAnalytics(`/products/${product.slug}`, null);

  const collection = COLLECTIONS[product.category];
  const showStock = product.stock > 0 && product.stock <= 15;

  const handleAdd = async () => {
    await trackAddToCart(product._id);
    openCheckout();
  };

  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <>
      <article className="pb-28">
        <section className="section-padding pt-8 grid lg:grid-cols-2 gap-12">
          <ImageGallery images={product.images} />
          <div className="space-y-5">
            {collection && (
              <Link href={`/collections/${collection.slug}`} className="text-sm text-primary font-medium">
                {collection.title}
              </Link>
            )}
            <h1 className="premium-heading text-3xl md:text-4xl leading-tight">{product.title}</h1>
            <p className="text-lg text-gray-600">{product.shortDescription || product.headline}</p>
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-bold text-primary">₪{product.price}</span>
              {product.compareAtPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">₪{product.compareAtPrice}</span>
                  {discount > 0 && (
                    <span className="bg-accent text-primary text-sm font-semibold px-3 py-1 rounded-pill">
                      -{discount}%
                    </span>
                  )}
                </>
              )}
            </div>
            {product.discountTag && (
              <p className="text-sm text-primary bg-accent inline-block px-3 py-1 rounded-pill">{product.discountTag}</p>
            )}
            {showStock && <p className="text-sm text-gray-500">נותרו {product.stock} יחידות במלאי</p>}
            <button type="button" onClick={handleAdd} className="btn-primary w-full hidden md:flex">
              להוסיף לעגלה
            </button>
            <TrustRow />
          </div>
        </section>
        <section className="section-padding bg-surface rounded-card mx-4 md:mx-8 max-w-6xl">
          <h2 className="premium-heading text-2xl mb-3">{product.hook || 'טיפוח עצמי צריך להיות פשוט וברור'}</h2>
          <p className="text-gray-600 mb-6">{product.context || 'שגרה לא עקבית מקשה לראות תוצאות לאורך זמן'}</p>
          <p className="font-medium text-secondary">{product.solution || 'מוצרים חכמים שנועדו לפשט את שגרת הטיפוח'}</p>
        </section>
        {product.bullets?.length > 0 && (
          <section className="section-padding">
            <h2 className="premium-heading text-2xl mb-8 text-center">יתרונות</h2>
            <ul className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {product.bullets.map((b) => (
                <li key={b} className="card flex gap-3 items-start">
                  <span className="text-primary">✓</span> {b}
                </li>
              ))}
            </ul>
          </section>
        )}
        {product.howItWorks?.length > 0 && (
          <section className="section-padding bg-accent/30">
            <h2 className="premium-heading text-2xl mb-10 text-center">איך זה עובד</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {product.howItWorks.map((step, i) => (
                <div key={step} className="card text-center">
                  <span className="inline-flex w-10 h-10 rounded-full bg-primary text-white items-center justify-center font-bold mb-3">
                    {i + 1}
                  </span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {product.reviews?.length > 0 && (
          <section className="section-padding border-t">
            <h2 className="premium-heading text-2xl mb-8 text-center">ביקורות לקוחות</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {product.reviews.map((r, i) => (
                <div key={i} className="card">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <StarRating rating={r.rating} />
                    {r.verifiedPurchase && (
                      <span className="text-xs text-gray-500 bg-surface px-2 py-0.5 rounded-pill">רכישה מאומתת ✓</span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-2">{r.text}</p>
                  <p className="text-sm font-medium">– {r.name}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        <section className="section-padding text-center">
          <h2 className="premium-heading text-2xl mb-6">מוכנים לשדרג את השגרה?</h2>
          <button type="button" onClick={handleAdd} className="btn-primary">להוסיף לעגלה</button>
        </section>
      </article>
      <StickyCTA onClick={handleAdd} label="להוסיף לעגלה" />
      {checkoutOpen && <CheckoutModal product={product} price={product.price} onClose={closeCheckout} />}
    </>
  );
}
