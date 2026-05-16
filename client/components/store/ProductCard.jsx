'use client';

import Image from 'next/image';
import Link from 'next/link';
import { trackProductClick } from '@/utils/analytics';

export default function ProductCard({ product }) {
  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : null;

  const handleClick = () => {
    trackProductClick(product._id, product.slug);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      onClick={handleClick}
      className="group card p-0 overflow-hidden hover:shadow-card transition-shadow block"
    >
      <div className="relative aspect-[4/5] bg-surface overflow-hidden">
        <Image
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80'}
          alt={product.title}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-pill">
            -{discount}%
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-secondary line-clamp-2 mb-1">{product.title}</h3>
        {product.shortDescription && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.shortDescription}</p>
        )}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary">₪{product.price}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-gray-400 line-through">₪{product.compareAtPrice}</span>
          )}
        </div>
        {product.stock > 0 && product.stock <= 10 && (
          <p className="text-xs text-gray-500 mt-2">נותרו {product.stock} יחידות</p>
        )}
      </div>
    </Link>
  );
}
