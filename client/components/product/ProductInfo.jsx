'use client';

import CountdownTimer from '@/components/CountdownTimer';
import LimitedStock from '@/components/LimitedStock';

export default function ProductInfo({
  product,
  price,
  onBuy,
  ctaColor = 'primary',
}) {
  const discount = product.compareAtPrice
    ? Math.round((1 - price / product.compareAtPrice) * 100)
    : 50;

  const btnClass = ctaColor === 'secondary' ? 'btn-secondary' : 'btn-primary';

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-extrabold">{product.title}</h1>

      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-primary">₪{price}</span>
        {product.compareAtPrice && (
          <>
            <span className="text-xl text-gray-400 line-through">₪{product.compareAtPrice}</span>
            <span className="bg-primary text-white text-sm font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          </>
        )}
      </div>

      <CountdownTimer label="מבצע נגמר בעוד 24 שעות" />
      <LimitedStock stock={product.stock} />

      <p className="text-lg font-semibold">{product.headline}</p>
      <ul className="space-y-2">
        {(product.bullets || []).map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span className="text-green-500">✔</span> {b}
          </li>
        ))}
      </ul>

      <div className="hidden md:block">
        <button type="button" onClick={onBuy} className={`${btnClass} w-full`}>
          קני עכשיו
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center text-sm text-gray-600 pt-4 border-t">
        <div>🚚 משלוח חינם</div>
        <div>🔒 תשלום מאובטח</div>
        <div>✅ אחריות 30 יום</div>
      </div>
    </div>
  );
}
